import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from '../components/Post';
import Card from '../components/Card';
import Loader from '../components/Loader';

export default function Home() {
    const[posts,setPosts] = useState([]);
    const[oldPosts,setOldPosts] = useState([]);
    const[loading,setLoading] = useState(false);

    useEffect(()=> {
        // Load Posts
        const loadPosts = async () =>{
          setLoading(true);
          try{
            let response = await axios.get("/api/posts");
            let data = response.data.posts;
        
            setPosts(data);
            setLoading(false);
          }catch(error){
            console.log("There was an error loading the posts.");
            setLoading(false);
          }
        }
        loadPosts();
        
        //Load Old Posts 
        const loadOldPosts = async () =>{
          setLoading(true);
          try{
            let {data}= await axios.get('/api/posts/old');
            setOldPosts(data);
          }catch(error){
            console.log(error);
            setLoading(false);
          }
        }
        loadOldPosts();
      },[])
    

  
    return (
        <div>
            <div className="grid place-items-center py-12">
                <h1 className="text-4xl mb-4">Learning Blog</h1>
                <div className="py-4 max-w-lg text-center">
                  <p className="mb-2 dark:text-purple-400">Welcome to my blog!</p>
                  <p>It's currently being used as a learning tool for my coding endeavours and for writing short posts about a variety of things, from animals, food and travel to games and code.</p>
                </div>
                
            </div>
        {/* Main feed */}
        {loading ? 
        <Loader/> : <div className="grid place-items-center">
          {/* Posts */}
          <div className="px-5">
            {posts.length === 0 ? 
            <div className="text-center border-double border-purple-300 border-2 p-5 m-5 mb-20">
                <h2>No posts found.</h2>
            </div> : 
            posts.map((post)=>{
              return(
                <Post key={post._id} {...post}/>
              )
            })}
          </div>
        
        {/* Bottom Section with Older Posts */}
        <div className="w-full border-t-2 pt-5">
          <h2 className="text-center p-5 mb-5">Older Posts</h2>
          {/* Older Posts List */}
          <div className="grid auto-cols-fr md:grid-cols-2 gap-5">
            {oldPosts.length ===0 ? <h2>No older posts</h2> :
            oldPosts.map((post)=>{
              return <Card key={post._id} {...post}/>
            })}
          </div>
        </div>
        </div>} 
      </div>
    )
}
