import axios from 'axios';
import React, { useState} from 'react';
import Form from '../components/Form';
import Message from '../components/Message';

import { useGlobalContext } from '../context';


export default function NewPost() {
    const{userInfo} = useGlobalContext();
    const[image,setImage] = useState("/images/default.jfif");
    const[loading,setLoading] = useState(false);
    const[message,setMessage] = useState('');
    const[messageType,setMessageType] = useState('default');
    const[messageLink,setMessageLink] = useState('');
    

    const updateMessage = (message,type,link) =>{
        setMessage(message);
        if(type) setMessageType(type);
        if(link) setMessageLink(link);
    }

    const submitForm = async (title,tags,text)=>{
        if(title && image && tags.length>0 && text){
            setLoading(true);
            try{
                let config = {headers:{'Content-Type':'application/json', Authorization: `Bearer ${userInfo.token}`}};

                const {data} = await axios.post("/api/posts"
                ,{title,image,tags,text},config);
               
                updateMessage(`Successfully created post: ${title}`,"success",`/posts/${data._id}`);
                setLoading(false);
            }catch(error){
                if(error.response.status === 400){
                    updateMessage(error.response.data.message,"error");
    
                }else if(error.response.status === 401){
                    updateMessage("Unauthorized to create posts.","error");
                }
                setLoading(false);
            }
        }else{
            updateMessage("Fields are not filled in.","error");
        }
        
    }


    return (
        <div className="grid md:grid-cols-2 place-items-center">
            <h1 className="mb-10 md:col-span-2">New Post</h1>
            <div className="md:col-start-1 h-60 md:h-5/6 w-full max-w-lg md:px-5 md:pb-5">
                <img className="object-cover w-full h-full" src={image} onError={(e)=>{e.target.onerror =null; e.target.src="/images/default.jfif"}} alt="default"/>
            </div>
            <Form btnTitle={'Create Post'} submitForm={submitForm} setImage={setImage}/>
            <div className="md:col-span-2">
            {loading ? <p>loading...</p> : message && <Message type={messageType} link={messageLink}>{message}</Message>}
            </div>
        </div>
    )
}
