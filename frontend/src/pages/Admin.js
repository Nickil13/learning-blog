import React, { useState, useEffect} from 'react';
import axios from 'axios';
import AdminRow from '../components/AdminRow';
import Alert from '../components/Alert';
import Loader from '../components/Loader';
import { useGlobalContext} from '../context';
import Pagination from '../components/Pagination';
import { useParams, useHistory } from 'react-router';

export default function Admin() {
    const[posts,setPosts] = useState([]);
    const {pageNumber} = useParams() || 1;
    const[pages,setPages]= useState(1);
    const[page,setPage] = useState(1);
    const{userInfo,showAlert,isAlertShowing,isConfirmDelete, setIsConfirmDelete,loading,setLoading} = useGlobalContext();
    const[isDeleting,setIsDeleting] = useState(false);
    const[postToDelete,setPostToDelete] = useState(null);
    const history = useHistory();

    useEffect(()=>{
        const fetchPosts = async () =>{
            setLoading(true);
            try{
                
                let config = {headers:{Authorization: `Bearer ${userInfo.token}`}};

                const {data} = await axios.get(`/api/posts/admin?pageNumber=${pageNumber}`, config);
                
                setPages(data.pages);
                setPosts(data.posts);
                setPage(data.page);
                setLoading(false);
                
            }catch(error){
                console.log("Error fetching posts.");
                console.error(error);
                setLoading(false);
            }
        }
        fetchPosts();
    },[pageNumber])

    useEffect(()=>{
        if(!isAlertShowing && isConfirmDelete && isDeleting){
            const deletePost = async () =>{
                setLoading(true);
                try{
                    let config = {headers:{'Content-Type':'application/json', Authorization: `Bearer ${userInfo.token}`}};
                    await axios.delete(`/api/posts/${postToDelete._id}`,config);
                    
                    setIsDeleting(false);
                    setIsConfirmDelete(false);
                    setPostToDelete(null);
                    setLoading(false);
                }catch(error){
                    console.log(error);
                    setLoading(false);
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

    const sortPosts = (criteria) => {
        let sortedPosts = [...posts];
        if(criteria==="title"){
            sortedPosts = sortedPosts.sort((a,b)=>(a.title> b.title) ? 1 : -1);
        }else if(criteria==="tags"){
            sortedPosts = sortedPosts.sort((a,b)=>(a.tags[0] > b.tags[0]) ? 1 : -1);
        }else if(criteria==="date"){
            sortedPosts = sortedPosts.sort((a,b)=>(a.createdAt > b.createdAt) ? 1 : -1);
        }

        setPosts(sortedPosts);
        if(page!=0){
            history.push('/admin/page/1');
        }
        
    }
    const handleFilterSelect = (e) => {
        sortPosts(e.target.value);
    }
    return (
        <div className="grid place-items-center w-full dark:bg-gray-600 py-10 rounded-md">
            <h1 className="mb-5">Admin Dashboard</h1>
            <p>Add new posts and edit or remove old posts!</p>
            
            {/* All Posts Container */}
            <div className="p-10 w-full max-w-5xl">
                <h2 className="border-b-2 pb-2 m-2">Posts</h2>
                
                {loading? <Loader/> : posts.length === 0 ? <h2>No Posts Found</h2> : (<>
                <div className="sm:hidden flex gap-5 px-2 py-5 justify-end">
                    <p>Filter by: </p>
                    <select className="rounded" name="post-filter" id="post-filter" onChange={handleFilterSelect}>
                        <option value="" hidden></option>
                        <option value="title">title</option>
                        <option value="tags">tags</option>
                        <option value="date">date</option>
                    </select>
                </div>
                <div className="hidden sm:grid grid-cols-admin-table  sm:mb-1 rounded-md dark:text-gray-100 text-center">
                    <div className="lg:w-4/5 p-2 font-semibold cursor-pointer" onClick={()=>sortPosts("title")}>Title</div>
                    <div className="lg:w-4/5 p-2 font-semibold cursor-pointer" onClick={()=>sortPosts("tags")}>Tags</div>
                    <div className="lg:w-4/5 p-2 font-semibold cursor-pointer" onClick={()=>sortPosts("date")}>Date</div>
                    <div className="lg:w-4/5 p-2 font-semibold">Edit/Remove Post</div>       
                </div>

                <div className="grid grid-flow-row">
                    { 
                    posts.map((post)=>{
                        return(
                            <AdminRow key={post._id} post={post} handleDeletePost={handleDeletePost}/>
                        );
                    })
                    }
                    
                    <div className="grid place-items-center">
                            <Pagination pages={pages} page={page} />
                    </div>
                    
                </div></>)}
                
            </div>
            {/* Alert used to confirm deleting a post */}
            {isAlertShowing && <Alert postName={postToDelete.title}/>}
        </div>
    )
}
