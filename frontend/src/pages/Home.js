import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Post from '../components/Post';
import Card from '../components/Card';

export default function Home() {
    const[posts,setPosts] = useState([]);
    const[oldPosts,setOldPosts] = useState([]);
    const[filterCategory,setFilterCategory] = useState("");
    const location = useLocation();
    const maxPosts = 8;

    useEffect(()=> {
        // Load Posts
        const loadPosts = async () =>{
          try{
            let { data } = await axios.get("/api/posts");

            if(filterCategory){
              data = data.filter((post)=>post.tags.includes(filterCategory));
            }
            if(data.length>maxPosts){
              setPosts(data.slice(0,maxPosts));
            }else{
              setPosts(data);
            }
            
          }catch(error){
            console.log("There was an error loading the posts.");
          }
        }
        loadPosts();
         // Load Posts
         const loadOldPosts = async () =>{
          try{
            let { data } = await axios.get("/api/posts");

            if(data.length>maxPosts){
              setOldPosts(data.slice(maxPosts,data.length));
            }
            
          }catch(error){
            console.log("There was an error loading the old posts.");
          }
        }
        loadOldPosts();
        
      },[filterCategory])
    
    useEffect(()=>{
      if(location.search){
        let category = location.search.split("=")[1];
        setFilterCategory(category);
      }else{
        setFilterCategory("");
      }
    },[location])

    return (
        <div>
            <div className="grid place-items-center py-12">
                <h1>Learning Blog</h1>
                <p className="py-4 max-w-sm">Welcome to my blog! I write about a variety of things, from animals, food and travel to games and code.</p>
            </div>
        {/* Main feed */}
        <div className="grid place-items-center">
          {/* Posts */}
          <div className="px-5">
            {posts.length === 0 ? 
            <div className="text-center border-double border-purple-300 border-2 p-5 m-5 mb-20">
                <h2>No posts found with the category: {filterCategory}</h2>
                <p>Please check back another time.</p>
            </div> : 
            posts.map((post)=>{
              return(
                <Post key={post._id} {...post}/>
              )
            })}
          </div>
        
        {/* Bottom Bar with Older Posts */}
        <div className="w-full border-t-2 pt-5">
          <h2 className="text-center mb-5">Older Posts</h2>
          {/* Older Posts List */}
          <div className="grid auto-cols-fr md:grid-cols-2 gap-5">
            {/* Card */}
            {oldPosts.length ===0 ? <h2>No older posts</h2> :
            oldPosts.map((post)=>{
              return <Card key={post._id} {...post}/>
            })}
          </div>
        </div>
        </div> 
      </div>
    )
}
