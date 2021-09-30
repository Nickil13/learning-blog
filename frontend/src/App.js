import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import { useGlobalContext } from "./context";
import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from './pages/Login';
import IndividualPost from './pages/IndividualPost';
import NewPost from './pages/NewPost';
import EditPost from './pages/EditPost';
import Posts from './pages/Posts';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


function App() {
  const{isLoggedIn} = useGlobalContext();
  return (
    <div className="relative min-h-screen pb-24 dark:bg-gray-700">
      <Router>
          <Navbar/>
          <main className="grid place-items-center py-20 w-5/6 mx-auto">
            <Switch>
              <Route exact path="/"><Home/></Route>
                <Route path="/login">
                  {isLoggedIn ? <Redirect to="/admin"/> : <Login/>}
                </Route>
                <Route path="/admin/page/:pageNumber"><Admin/></Route>
                <Route path="/admin/new-post"><NewPost/></Route>
                
                <Route path="/admin/edit-post/:id"><EditPost/></Route>
                
                <Route path="/admin">
                  {!isLoggedIn ? <Redirect to="/login"/> : <Admin/>}
                </Route>
                
                
                <Route path="/admin"><Admin/></Route>
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
