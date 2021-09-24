import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import {FiArrowLeftCircle, FiArrowRightCircle} from 'react-icons/fi';
import {AiOutlineFileAdd, AiOutlineUser} from 'react-icons/ai';
import DarkModeToggle from './DarkModeToggle';
import { useGlobalContext } from '../context';
import {GiStack, GiCat, GiAirplaneDeparture, GiGamepad, GiCoffeeCup, GiHouse, GiHearts} from 'react-icons/gi';
import {BsCodeSlash} from 'react-icons/bs';

export default function Navbar() {
    const[isSidebarOpen,setIsSidebarOpen] = useState(false);
    const{isLoggedIn,userInfo,logout,theme} = useGlobalContext();
    const[isMenuShowing,setIsMenuShowing] = useState(false);
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

    const handleOffClick = (e) =>{
      if(navContainer.current && !navContainer.current.contains(e.target)){
        setIsSidebarOpen(false);
      }
      const menu = document.getElementById("admin-menu");
      if(!menu.contains(e.target)){
        setIsMenuShowing(false);
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
    <header className="h-12 transparent">
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
          <div className="relative grid bg-black bg-opacity-50 pointer-events-auto" ref={navContainer}>
            <DarkModeToggle/>
          
          <ul className="flex flex-col justify-center grid-start-2 gap-5  h-screen px-5 pointer-events-auto">
            <li>
              <GiHouse className="nav-icon" onClick={()=>handleNavClick("home")}/>
            </li>
            <li><GiStack className="nav-icon" onClick={()=>handleNavClick("all")}/></li>
            <li><GiCat className="nav-icon" onClick={()=>handleNavClick("animals")}/></li>
            <li>
              <GiCoffeeCup className="nav-icon" onClick={()=>handleNavClick("food")}/>
            </li>
            <li>
              <GiAirplaneDeparture className="nav-icon" onClick={()=>handleNavClick("travel")}/>
            </li>
            <li>
              <GiGamepad className="nav-icon" onClick={()=>handleNavClick("games")}/>
            </li>
            <li>
              <BsCodeSlash className="nav-icon" onClick={()=>handleNavClick("code")}/>
            </li>
            <li>
              <GiHearts className="nav-icon" onClick={()=>handleNavClick("wellness")}/>
            </li>   
          </ul> 
          </div>
        </nav>
        {/* Slideout Menu for user */}
        
        <ul id="admin-menu" className={` fixed bg-black z-20 opacity-80 text-white rounded ${!isMenuShowing && "hidden"}`}>
                <li className="py-1 px-2"><strong>{userInfo.username}</strong></li>
                <li className="hover:text-gray-500 py-1 px-2 cursor-pointer" onClick={handleDashboardClick}>Dashboard</li>
                <li className="hover:text-gray-500 py-1 px-2 cursor-pointer" onClick={handleLogoutClick}>Logout</li>
        </ul>
    </header>
    )
}
