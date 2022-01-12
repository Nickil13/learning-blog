import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import { useGlobalContext } from "./context";
import {Admin, AdminPosts, Drafts, EditPost, Home, IndividualPost, Login, NewPost, Posts} from './pages';
import {Navbar, Footer} from './components';


function App() {
  const{isLoggedIn} = useGlobalContext();
  return (
    <div className="relative min-h-screen pb-24 px-5 dark:bg-gray-700">
      <Router>
          <Navbar/>
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
