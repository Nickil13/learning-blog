import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import {FiEdit} from 'react-icons/fi';
import {HiOutlineDocumentRemove} from 'react-icons/hi';
import Moment from 'react-moment';

export default function AdminRow({post, handleDeletePost}) {
    const history = useHistory();
    return (
        // Row
        <div key={post._id} className="grid place-items-center w-4/5 sm:w-full mx-auto py-2 sm:grid-cols-admin-table bg-gray-300 dark:bg-gray-700 mb-2 rounded-md">
                                
        {/* First Column - Title */}
        <div className="lg:w-4/5 p-2 text-center text-xl sm:text-base dark:text-gray-100">
            <Link to={`/posts/${post._id}`} className="hover:underline ">{post.title}
            </Link>
        </div>
        
        {/* Second Column - Tags */}
        <div className="lg:w-4/5 p-2">
            <ul>
                {post.tags.map((tag,index)=>{
                    return <li key={index} className="text-purple-600 dark:text-purple-300 p-1">#{tag}</li>
                })}
            </ul>
        </div>

        {/* Third Column - Date */}
        
        <div className="lg:w-4/5 p-2 dark:text-gray-300">
            <Moment format="MMM DD YYYY" date={post.createdAt}/>
        </div>
        
        {/* Fourth Column - Date */}
        <div className="flex lg:w-4/5 p-2">
            <button className="btn-primary mr-2" onClick={()=>history.push(`/admin/edit-post/${post._id}`)}><FiEdit className="text-3xl"/></button>
            <button className="btn-primary" onClick={()=>handleDeletePost(post)}><HiOutlineDocumentRemove className="text-3xl"/></button>
        </div>
        
    </div>
    )
}
