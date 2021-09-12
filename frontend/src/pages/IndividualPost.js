import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import { useParams, useHistory, Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import {useGlobalContext} from '../context';
import Loader from '../components/Loader';

export default function IndividualPost() {
    const[post,setPost] = useState(null);
    const{id} = useParams();
    const history = useHistory();
    const{isLoggedIn,loading,setLoading} = useGlobalContext();

    useEffect(()=>{
        const loadPost = async () =>{
            setLoading(true);
            try{
                const {data} = await axios.get(`/api/posts/${id}`);
                setPost(data);
                setLoading(false);
                     
            }catch(error){
                setLoading(false);
                console.log("There was an error finding the post.");
            }
        }
        loadPost();
        
    },[id,setLoading])

    if(loading){
        return(
            <Loader/>  
        )
    }
    return (
        <div className="w-full">
            {/* Post Container */}
            {!post ? 
            <div>
                <h1>No blog post found.</h1>
                <Link className="btn-primary block w-32 text-center my-5 mx-auto" to="/">back to Home</Link>
            </div> 
                : <article className="grid place-items-center w-full max-w-3xl mx-auto relative">
                <h1 className="text-center mb-5">{post.title}</h1>
                <Moment className="text-gray-400" format="MMM DD YYYY" date={post.createdAt}/>
                <ul className="flex gap-2 text-gray-500 dark:text-purple-400 mb-5">
                    {post.tags.map((tag,index)=>{
                        return(
                            <li key={index}>#{tag}</li>
                        )
                    })}
                </ul>
                <img className="object-cover max-h-60 md:max-h-96 w-full" src={post.image} alt={post.title}/>
                <div className="py-5">
                {post.text.replace('\n\n','\n').split('\n').map((paragraph,index)=>{
                    return <p key={index}>{paragraph}<br/><br/></p>
                    })}
                </div>
                {/* Edit button  */}
                {isLoggedIn && <button className="btn-primary absolute -top-20 right-0 flex gap-5" onClick={()=>history.push(`/admin/edit-post/${post._id}`)}>
                    Edit <FiEdit className="text-2xl"/>
                </button>}
            </article>}
            
        </div>
    )
}
