import React, { useState, useEffect, useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';
import {FiArrowLeftCircle, FiArrowRightCircle} from 'react-icons/fi';
import {AiOutlineFileAdd, AiOutlineUser} from 'react-icons/ai';
import DarkModeToggle from './DarkModeToggle';
import { useGlobalContext } from '../context';
import { iconData } from '../data';


export default function Navbar({isSmallScreen}) {
    const[isSidebarOpen,setIsSidebarOpen] = useState(false);
    const{isLoggedIn,userInfo,logout,theme} = useGlobalContext();
    const[isMenuShowing,setIsMenuShowing] = useState(false);
    const[isCategoryMenuShowing,setIsCategoryMenuShowing] = useState(false);
    const[selectedCategory,setSelectedCategory] = useState('');
    const navContainer = useRef(null);
    const history = useHistory();
 

    useEffect(()=>{
      if(theme==='dark'){
        document.documentElement.classList.add('dark');
      }else{
        document.documentElement.classList.remove('dark');
      } 
    },[theme])
    
    
    useEffect(()=>{
        document.addEventListener("mousedown",handleOffClick);
        return () =>{
            document.removeEventListener("mousedown",handleOffClick);
        }
    },[])

    const handleNavClick = (category) =>{
      if(category==="home"){
        history.push("/");
      }else{
        history.push(`/posts/?category=${category}`)
      }
      
      //Scroll to top of page
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      
    }

    const handleCategoryClick = (category) =>{
      handleNavClick(category);
      setIsCategoryMenuShowing(false);
      setSelectedCategory(category);
    }
    const handleOffClick = (e) =>{
      if(navContainer.current && !navContainer.current.contains(e.target)){
        setIsSidebarOpen(false);
      }
      const menu = document.getElementById("admin-menu");
      if(!menu.contains(e.target)){
        setIsMenuShowing(false);
      }

      const categoryMenu = document.getElementById("category-menu");
      if(categoryMenu && !categoryMenu.contains(e.target)){
        setIsCategoryMenuShowing(false);
      }
    }
    const handleMenuClick = () =>{
      setIsMenuShowing(true);
      //Using the li element for consistency versus the icon
      const userRect = document.getElementById("user-icon").getBoundingClientRect();
      
      const {left,right,top,bottom,width} = userRect;
      const menu = document.getElementById("admin-menu");
      
      menu.style.right = `${right-left+width+5}px`;
      menu.style.bottom =`${bottom-top-5}px`;
    }

    const handleLogoutClick = () =>{
      setIsMenuShowing(false);
      logout();
      history.push("/");
    }

    const handleDashboardClick = () =>{
      setIsMenuShowing(false);
      history.push("/admin");
    }

    return (
    <header className="transparent">
        {!isSmallScreen && <div className="absolute font-display font-bold text-gray-700 dark:text-purple-300 p-5"><Link to="/">Learning Blog</Link></div>}
        
        {/* Mobile Navbar */}
        {isSmallScreen ? <nav className="fixed flex items-center p-4 bg-black bg-opacity-60 z-10 w-full top-0 left-0">
          <span className="mr-4 cursor-pointer" onClick={()=>{
            history.push('/');
            setSelectedCategory('');
          }}><img src="/favicon-32x32.png" alt="feather logo"/></span>
          <div className="flex items-center justify-end w-full">
            {/* Subject select */}
            <div className="relative">
              <span className="nav-icon" onClick={()=>setIsCategoryMenuShowing(true)}>{selectedCategory ? iconData.find((icon)=>icon.name===selectedCategory).icon : iconData.find((icon)=>icon.name==="home").icon}</span>
              
              {/* Category Menu Modal */}
              <ul className={`absolute bg-black z-20 opacity-80 p-4 rounded-md mt-5 top-full -left-1/4 ${!isCategoryMenuShowing && 'hidden'}`} id="category-menu">
                {iconData.filter((category)=>category.name !=="home").map((category, index)=>{
                  return(
                    <li key={index} className="flex items-center text-white hover:text-purple-300 text-lg cursor-pointer" onClick={()=>handleCategoryClick(category.name)}><span className="mr-2 text-2xl">{category.icon}</span>{category.name}</li>
                  )
                })}
              </ul>
            </div>
            {isLoggedIn && <AiOutlineUser className="nav-icon mx-2" onClick={handleDashboardClick}/>}
            <DarkModeToggle compact/>
          </div>
        </nav> :

        <nav className={`fixed grid grid-cols-2 right-0 h-screen place-items-center justify-center gap-5 z-10 pointer-events-none ${!isSidebarOpen && "transform translate-x-1/2"} transition duration-500 ease-in-out`}>
          {/* Arrow Slide Bar */}
          <div className="pointer-events-auto">
            <div className="bg-black bg-opacity-60 rounded-full p-2 shadow-md">
            {isSidebarOpen ? <FiArrowRightCircle onClick={()=>setIsSidebarOpen(false)} className="nav-icon"/> :
            <FiArrowLeftCircle onClick={()=>setIsSidebarOpen(true)} className="nav-icon"/>
            }
            </div>
            {isLoggedIn &&
            <ul className="bg-black bg-opacity-60 rounded-full p-2 shadow-md absolute bottom-5 pointer-events-auto">
              <li onClick={()=>history.push("/admin/new-post")}><AiOutlineFileAdd className="nav-icon mb-5" /></li>
              <li id="user-icon"onClick={handleMenuClick}><AiOutlineUser className="nav-icon"/></li>
            </ul>}
          </div>
          {/* Nav Icons */}
          <div className="relative grid bg-black bg-opacity-50 pointer-events-auto h-screen pt-44" ref={navContainer}>
            <DarkModeToggle/>
            <ul className="flex flex-col grid-start-2 p-5 pointer-events-auto">
              {iconData.map((item)=>{
                return(
                  <li key={item.id} className='nav-icon mb-4' onClick={()=>{
                    handleNavClick(item.name)
                  }}>{item.icon}</li>
                )
              })}
            </ul> 
          </div>
        </nav>
        }
        {/* Slideout Menu for user */}
        
        <ul id="admin-menu" className={` fixed bg-black z-20 opacity-80 text-white rounded ${!isMenuShowing && "hidden"}`}>
                <li className="py-1 px-2"><strong>{userInfo.username}</strong></li>
                <li className="hover:text-gray-500 py-1 px-2 cursor-pointer" onClick={handleDashboardClick}>Dashboard</li>
                <li className="hover:text-gray-500 py-1 px-2 cursor-pointer" onClick={handleLogoutClick}>Logout</li>
        </ul>
    </header>
    )
}
