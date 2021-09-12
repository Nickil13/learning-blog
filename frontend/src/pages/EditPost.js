import axios from 'axios';
import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import ComboBox from '../components/ComboBox';
import ImageInput from '../components/ImageInput';
import Message from '../components/Message';
import {useGlobalContext} from '../context';
import ImageSelector from '../components/ImageSelector';
import {tagData} from '../data';

export default function EditPost() {
    const[post,setPost] = useState(null);
    const[title,setTitle] = useState("");
    const[imageName,setImageName] = useState("default.jfif");
    const[imagePath,setImagePath] = useState("/images/default.jfif");
    const[tag1,setTag1] = useState("");
    const[tag2,setTag2] = useState("");
    const[tag3,setTag3] = useState("");
    const[text,setText] = useState("");
    const[currentTags,setCurrentTags] = useState(1);
    // const[message,setMessage] = useState("");
    // const[messageType,setMessageType] = useState("default");
    const{userInfo,updateMessage,message,messageType,messageLink} = useGlobalContext();
    const {id} = useParams();
    const imageTypes = ['image/png','image/jpeg'];
    const[selectedImage,setSelectedImage] = useState(null);
    const[selectorShowing,setSelectorShowing] = useState(false);
    const[imageSource,setImageSource] = useState('');
    const[uploadedFile,setUploadedFile] = useState(null);
   
    useEffect(()=>{
        const loadPost = async () =>{ 
            try{
                const {data} = await axios.get(`/api/posts/${id}`);
                setPost(data);
            }catch(error){
                console.log(error);
            }
        }
        loadPost();
    },[id])
    
    useEffect(()=>{
        if(post){
            setTitle(post.title);
            
            setCurrentTags(post.tags.length);
            setTag1(post.tags[0])
            if(post.tags.length>1){
                setTag2(post.tags[1]);
            }
            if(post.tags.length>2){
                setTag3(post.tags[2]);
            }
            
            setImageName(post.image);
            setImagePath(post.image);
            setText(post.text);

        }
        
    },[post])
    
    useEffect(()=>{
        if(selectedImage){
            setImageName(`${selectedImage.public_id.split("/")[1]}.${selectedImage.format}`);
            setImagePath(selectedImage.url);
            setImageSource(selectedImage.url);
        }
    },[selectedImage])


    useEffect(()=>{
        if(uploadedFile){
            console.log(uploadedFile);
            const reader = new FileReader();
            reader.readAsDataURL(uploadedFile);
            reader.onloadend = () => {
                setImageSource(reader.result);
                
            }
        }
    },[uploadedFile])

    const uploadImage = async(e) => {
    
        if(imageSource){
            //Upload to cloudinary
            try{
                const {data} = await axios.post('/api/cloudinary/upload', JSON.stringify({data: imageSource,file_name: uploadedFile.name}),
                {headers: {
                    'Content-Type': 'application/json'
                }} )
                
                const url = data.uploadedResponse.url;
                setImageName(uploadedFile.name);
                setImagePath(url);
               
                updateMessage(`Uploaded image ${data.uploadedResponse.public_id}.`,'success')
                
            }catch(error){
                console.log(error.response.data);
                updateMessage("Upload failed.","error"); 
            }
        }else{
            updateMessage("No file to upload","error");
        }
    }
    // const changeHandler = (e) => {
    //     let selectedFile = e.target.files[0];
    //     if(selectedFile && imageTypes.includes(selectedFile.type)){
    //         console.log(selectedFile);
    //     }
    // }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        let tags = [tag1,tag2,tag3];
        let newTags = [];
        for(let i=0;i<tags.length;i++){
            if(tags[i] && tags[i]!=="none"){
                newTags.push(tags[i])
            }
        }
        

        if(title && newTags.length>0 && text){
            
            let config = {headers:{'Content-Type':'application/json', Authorization: `Bearer ${userInfo.token}`}};

            try{
                const {data} = await axios.put("/api/posts",{id,title,imagePath,newTags,text},config);
                console.log(data);
                updateMessage(`Successfully edited [${title}]`,"success");
                // setMessage(`Successfully edited [${title}]`);
                // setMessageType("success");
            }catch(error){
                console.log(error);
            }
        }else{
            updateMessage("Fields are not filled in.","error");
            // setMessage("Fields are not filled in.")
            // setMessageType("error");
        }
        
    }
    
    if(!post){
        return(
            <div className="grid md:grid-cols-2 place-items-center">
                <h1>Can't find the post you want to edit.</h1>
            </div>
        )
    }
    return (
        <div className="grid md:grid-cols-2 place-items-center">
                <h1 className="mb-10 md:col-span-2">Edit Post: {post.title}</h1>
            <div className="md:col-start-1 h-full">
                <img className="object-cover h-full" src={imagePath} onError={(e)=>{e.target.onerror =null; e.target.src="/images/default.jfif"}} alt="default" />
            </div>
            <form className="grid md:col-start-2 w-5/6" onSubmit={handleSubmit}>
                {/* Title Input */}
                <div className="flex flex-col md:flex-row justify-between items-center p-5">
                    <label className="mr-5 mb-3 dark:text-gray-400" htmlFor="title">Title</label>
                    <input className="post-input" type="text" id="title" placeholder="My Adventure" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                </div>
                {/* Image Input */}
                <ImageInput name={imageName} 
                handleUploadSelect={setUploadedFile} onUploadClick={uploadImage} setSelectorShowing={setSelectorShowing}/>
                
                {/* Image Selector */}
                {selectorShowing && <ImageSelector onSetSelected={setSelectedImage} setSelectorShowing={setSelectorShowing}/>}

                {/* Tag Inputs */}
                <div className="flex flex-col md:flex-row justify-between items-center p-5 gap-2">
                    <label className="mr-5 mb-3 dark:text-gray-400" htmlFor="tags">Tags</label>
                    <div className="flex flex-wrap gap-5 justify-center">
                        <ComboBox name="tag1" list={tagData} value={tag1} onChange={(e)=>setTag1(e.target.value)}/>
                        {currentTags>1 && <ComboBox name="tag2" list={tagData} value={tag2} onChange={(e)=>setTag2(e.target.value)}/>}
                        {currentTags>2 && <ComboBox name="tag3" list={tagData} value={tag3} onChange={(e)=>setTag3(e.target.value)}/>}
                    </div>
                    
                    {currentTags<3 &&<button className="dark:text-white" type="button" onClick={()=>setCurrentTags(currentTags+1)}>+</button>}
                </div>
                {/* Text Input */}
                <div className="flex flex-col justify-between items-center p-5 w-full">
                    <label className="mr-5 mb-3 dark:text-gray-400" htmlFor="text">Text</label>
                    <textarea className="w-full resize-none h-40 post-input" type="text" id="text" placeholder="This the start of my adventure." value={text} onChange={(e)=>setText(e.target.value)}/>
                </div>
                <button type="submit" className="btn-primary w-3/5 mx-auto">Edit Post</button>
                
                {message && <Message type={messageType} link={messageLink}>{message}</Message>}
            </form>

        </div>
    )
}