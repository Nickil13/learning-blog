import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cell from '../components/Cell';
import Alert from '../components/Alert';
import { useHistory} from 'react-router-dom';
import { useGlobalContext} from '../context';

export default function Admin() {
    const[posts,setPosts] = useState([]);
    const[pages,setPages]= useState([]);
    const[currentPosts,setCurrentPosts] = useState([]);
    const[currentPage,setCurrentPage] = useState("1");
    const itemsPerPage = 6;
    const history = useHistory();
    const{userInfo,showAlert,isAlertShowing,isConfirmDelete, setIsConfirmDelete} = useGlobalContext();
    const[isDeleting,setIsDeleting] = useState(false);
    const[postToDelete,setPostToDelete] = useState(null);


    useEffect(()=>{
        const fetchPosts = async () =>{
            try{
                const {data} = await axios.get("/api/posts");
                // Pagination
                let pagesNeeded = Math.ceil(data.length/itemsPerPage);
                let newPages = [];
                if(pagesNeeded>1){
                    for(let i=0;i<pagesNeeded;i++){
                        newPages.push((i+1).toString());
                    }
                }
                setPages(newPages);
                setPosts(data);
                setCurrentPosts(data.slice(0,itemsPerPage));
            }catch(error){
                console.log("Error fetching posts.");
            }
        }
        fetchPosts();
    },[])

    // Every time the page number changes, update the posts visible.
    useEffect(()=>{
        let startpoint = itemsPerPage*(currentPage-1);
        let length = posts.length-startpoint;
        if(length>itemsPerPage){
            length=itemsPerPage;
        }
        let endpoint = startpoint+length;
        
        if(currentPage==="0"){
            setCurrentPosts(posts);
        }else{
            setCurrentPosts(posts.slice(startpoint,endpoint));
        }
        
    },[currentPage,posts])

    useEffect(()=>{
        if(!isAlertShowing && isConfirmDelete && isDeleting){
            const deletePost = async () =>{
                try{
                    let config = {headers:{'Content-Type':'application/json', Authorization: `Bearer ${userInfo.token}`}};
                    await axios.delete(`/api/posts/${postToDelete._id}`,config);
                    
                    setIsDeleting(false);
                    setIsConfirmDelete(false);
                    setPostToDelete(null);
                }catch(error){
                    console.log(error);
                }
            }
            deletePost();
            
        }
    },[isAlertShowing])

    const handleDeletePost = (post) =>{
        showAlert();
        setIsDeleting(true);
        setPostToDelete(post);
    }

    return (
        <div className="relative grid place-items-center w-full bg-gray-600 py-10 rounded-md">
            <h1 className="text-gray-100 mb-5">Admin Dashboard</h1>
            <p className="text-gray-200">Add new posts and edit or remove old posts!</p>
            
            {/* All Posts Container */}
            <div className="p-10">
                <h2 className="text-gray-100">All Posts</h2>
                
                <div className="grid grid-cols-admin-table mb-1 rounded-md text-gray-100">
                    <Cell>Title</Cell>
                    <Cell>Tags</Cell>
                    <Cell>Date</Cell>
                    <Cell>Edit/Remove Post</Cell>       
                </div>

                <div className="grid grid-flow-row">
                    {currentPosts.length === 0 ? <h2>No Posts Found</h2> : 
                    currentPosts.map((post)=>{
                        return(
                            // Row
                            <div key={post._id} className="grid place-items-center w-4/5 sm:w-full mx-auto sm:grid-cols-admin-table bg-gray-300 dark:bg-purple-200 mb-1 rounded-md">
                                
                                {/* First Column - Title */}
                                <Cell>
                                    <Link to={`/posts/${post._id}`} className="hover:underline">{post.title}
                                    </Link>
                                </Cell>
                                
                                {/* Second Column - Tags */}
                                <Cell>
                                    <ul>
                                        {post.tags.map((tag,index)=>{
                                            return <li key={index} className="text-purple-600 p-1">#{tag}</li>
                                        })}
                                    </ul>
                                </Cell>
            
                                {/* Third Column - Date */}
                                <Cell>{post.createdAt}</Cell>
                                
                                {/* Fourth Column - Date */}
                                <Cell>
                                    <button className="btn-primary w-20 mr-2" onClick={()=>history.push(`/admin/edit-post/${post._id}`)}>edit</button>
                                    <button className="btn-primary w-20" onClick={()=>handleDeletePost(post)}>remove</button>
                                </Cell>
                                
                            </div>
                        );
                    })
                    }
                    
                    
                    {currentPage==="0" ?
                    <button className="mx-auto mt-5 w-40 btn-primary" onClick={()=>setCurrentPage("1")}>see fewer posts</button>
                    :(
                        <div className="grid place-items-center">
                            <ul className="flex gap-5 w-full justify-center mt-5">
                        {pages.map((page,index)=>{
                            return(
                            <li key={index} ><button className={`${currentPage===page && "bg-purple-300"} px-2 py-1 rounded bg-gray-300 hover:bg-purple-600 cursor-pointer`} onClick={()=>setCurrentPage(page)}>{page}</button></li>
                            );
                        })}
                    </ul>
                    {posts.length>itemsPerPage &&
                    <button className="mt-5 w-40 btn-primary" onClick={()=>setCurrentPage("0")}>see all posts</button>}
                    </div>
                    )}
                </div>
                {/* Alert used to confirm deleting a post */}
                {isAlertShowing && <Alert postName={postToDelete.title}/>}
            </div>
        </div>
    )
}
