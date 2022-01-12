import React, { useState, useEffect} from 'react';
import axios from 'axios';
import AdminRow from '../components/AdminRow';
import Alert from '../components/Alert';
import Loader from '../components/Loader';
import { useGlobalContext} from '../context';
import Pagination from '../components/Pagination';
import { useParams, useHistory } from 'react-router';
import { buttonList } from '../data';

export default function Admin() {
    // const[posts,setPosts] = useState([]);
    // const {pageNumber} = useParams() || 1;
    // const[pages,setPages]= useState(1);
    // const[page,setPage] = useState(1);
    // const{userInfo,showAlert,isAlertShowing,isConfirmDelete, setIsConfirmDelete,loading,setLoading} = useGlobalContext();
    // const[isDeleting,setIsDeleting] = useState(false);
    // const[deleteSuccess,setDeleteSuccess] = useState(false);
    // const[postToDelete,setPostToDelete] = useState(null);
    const history = useHistory();

    
    // useEffect(()=>{
    //     const fetchPosts = async () =>{
    //         setLoading(true);
    //         try{
    //             let config = {headers:{Authorization: `Bearer ${userInfo.token}`}};
                
    //             const {data} = await axios.get(`/api/posts/admin?pageNumber=${pageNumber}`, config);

    //             setPages(data.pages);
    //             setPosts(data.posts);
    //             setPage(data.page);
    //             setLoading(false);
                
    //         }catch(error){
    //             console.log("Error fetching posts.");
    //             console.error(error);
    //             setLoading(false);
    //         }
    //     }
    //     fetchPosts();
    // },[pageNumber,deleteSuccess])

    // useEffect(()=>{
    //     if(!isAlertShowing && isConfirmDelete && isDeleting){
    //         const deletePost = async () =>{
    //             setLoading(true);
    //             try{
    //                 let config = {headers:{'Content-Type':'application/json', Authorization: `Bearer ${userInfo.token}`}};
    //                 await axios.delete(`/api/posts/${postToDelete._id}`,config);
                    
    //                 setDeleteSuccess(true);
    //                 setIsDeleting(false);
    //                 setIsConfirmDelete(false);
    //                 setPostToDelete(null);
    //                 setLoading(false);
    //             }catch(error){
    //                 console.log(error);
    //                 setLoading(false);
    //             }
    //         }
    //         deletePost();
            
    //     }
    // },[isAlertShowing])

    // const handleDeletePost = (post) =>{
    //     showAlert();
    //     setIsDeleting(true);
    //     setPostToDelete(post);
    // }

    // const sortPosts = (criteria) => {
    //     let sortedPosts = [...posts];
    //     if(criteria==="title"){
    //         sortedPosts = sortedPosts.sort((a,b)=>(a.title> b.title) ? 1 : -1);
    //     }else if(criteria==="tags"){
    //         sortedPosts = sortedPosts.sort((a,b)=>(a.tags[0] > b.tags[0]) ? 1 : -1);
    //     }else if(criteria==="date"){
    //         sortedPosts = sortedPosts.sort((a,b)=>(a.createdAt > b.createdAt) ? 1 : -1);
    //     }

    //     setPosts(sortedPosts);
    //     if(page!==0){
    //         history.push('/admin/page/1');
    //     }
        
    // }
    // const handleFilterSelect = (e) => {
    //     sortPosts(e.target.value);
    // }
    
    return (
        <div className="grid place-items-center w-full dark:bg-gray-600 px-4 py-10 rounded-md max-w-xl">
            <h1 className="mb-5 text-center">Admin Dashboard</h1>
            <p className="text-center">Manage posts, drafts and view post statistics!</p>

            {/* Admin Buttons */}
            <div className="grid grid-rows-2 grid-flow-col auto-cols-fr  mt-6 ">
                {buttonList.map((item,index)=>{
                    return(
                    <div key={index} className="grid place-items-center p-6 bg-gray-300 hover:bg-gray-200 dark:bg-gray-700 m-1 cursor-pointer rounded-md dark:text-purple-300 shadow dark:hover:text-purple-200" onClick={()=>history.push(item.path)}>
                        <span className="text-4xl">{item.icon}</span>
                        <span className="">{item.name}</span>
                    </div>)
                })}
            </div>
        </div>
    )
}
