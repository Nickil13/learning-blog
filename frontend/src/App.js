import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import { useGlobalContext } from "./context";
import {Admin, AdminPosts, Drafts, EditPost, Home, IndividualPost, Login, NewPost, Posts} from './pages';
import {Navbar, Footer} from './components';

const SMALL_BREAKPOINT = 600;

function App() {
  const{isLoggedIn} = useGlobalContext();
  const[isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < SMALL_BREAKPOINT);

  useEffect(()=>{
    window.addEventListener("resize", checkSize);
    return () =>{
      window.removeEventListener("resize", checkSize);
    }
  },[])

  const checkSize = () =>{
    const width = window.innerWidth;
    if(width>SMALL_BREAKPOINT){
      setIsSmallScreen(false);
    }else{
      setIsSmallScreen(true);
    }
  }

  return (
    <div className={`relative ${isSmallScreen ? 'min-h-nav-height mt-nav' : 'min-h-screen'} pb-24 px-5`}>
      <Router>
          <Navbar isSmallScreen={isSmallScreen}/>
          <main className="grid place-items-center py-20">
            <Switch>
                <Route exact path="/"><Home/></Route>
                <Route path="/login">
                  {isLoggedIn ? <Redirect to="/admin"/> : <Login/>}
                </Route>
                <Route path="/admin/posts"><AdminPosts/></Route>
                <Route path="/admin/page/:pageNumber"><Admin/></Route>
                <Route path="/admin/new-post"><NewPost/></Route>
                <Route path="/admin/edit-post/:id"><EditPost/></Route>
                <Route path="/admin/drafts">
                  <Drafts/>
                </Route>
                <Route path="/admin">
                  {!isLoggedIn ? <Redirect to="/login"/> : <Admin/>}
                </Route>
                
                <Route path="/posts/:id"><IndividualPost/></Route>
                <Route path="/posts"><Posts/></Route>
                
                
            </Switch>
          </main>
          <Footer/>
      </Router>
    </div>
  );
}

export default App;
