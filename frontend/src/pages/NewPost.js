import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ComboBox from '../components/ComboBox';
import Message from '../components/Message';
import ImageInput from '../components/ImageInput';
import ImageSelector from '../components/ImageSelector';
import { useGlobalContext } from '../context';
import {tagData} from '../data';

export default function NewPost() {
    const[title,setTitle] = useState("");
    const[imageName,setImageName] = useState("default.jfif");
    const[imagePath,setImagePath] = useState("/images/default.jfif");
    const[tags,setTags] = useState([]);
    const[text,setText] = useState("");
    const[currentTags,setCurrentTags] = useState(1);
    const{userInfo,updateMessage,message,messageType,messageLink} = useGlobalContext();
    const[selectedImage,setSelectedImage] = useState(null);
    const[selectorShowing,setSelectorShowing] = useState(false);
    const[imageSource,setImageSource] = useState('');
    const[uploadedFile,setUploadedFile] = useState(null);

    
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

    const handleComboSelect = (e) =>{
        let comboBoxes = document.querySelectorAll("select");
        let newTags = [];
        for(let i = 0; i<comboBoxes.length;i++){
            let val = comboBoxes[i].value;
            if(val!=="none" && !newTags.includes(val)) newTags.push(val);
        }
        setTags(newTags); 
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        
        if(title && imagePath && tags && text){
            try{
                let config = {headers:{'Content-Type':'application/json', Authorization: `Bearer ${userInfo.token}`}};

                const {data} = await axios.post("/api/posts"
                ,{title,image: imagePath,tags,text},config);
               
                updateMessage(`Successfully created post: ${title}`,"success",`/posts/${data._id}`);
        
            }catch(error){
                if(error.response.status === 400){
                    updateMessage(error.response.data.message,"error");
    
                }else if(error.response.status === 401){
                    updateMessage("Unauthorized to create posts.","error");
                }
                console.log(error);
            }
        }else{
            updateMessage("Fields are not filled in.","error");
        }
        
    }

    return (
        <div className="grid md:grid-cols-2 place-items-center">
            <h1 className="mb-10 md:col-span-2">New Post</h1>
            <div className="md:col-start-1 h-60 md:h-5/6 w-full max-w-lg md:px-5 md:pb-5">
                <img className="object-cover w-full h-full" src={imagePath} onError={(e)=>{e.target.onerror =null; e.target.src="/images/default.jfif"}} alt="default" />
            </div>
            <form className="grid place-items-center md:col-start-2 p-5" onSubmit={handleSubmit}>
                {/* Title Input */}
                <div className="flex flex-col md:flex-row items-center p-5">
                    <label className="mb-3 md:mb-0 md:mr-5 dark:text-gray-400 font-semibold" htmlFor="title">Title</label>
                    <input className="post-input" type="text" id="title" placeholder="My Adventure" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                </div>

                {/* Image Input */}
                <ImageInput name={imageName} 
                handleUploadSelect={setUploadedFile} onUploadClick={uploadImage} setSelectorShowing={setSelectorShowing}/>
                
                {/* Image Selector */}
                {selectorShowing && <ImageSelector onSetSelected={setSelectedImage} setSelectorShowing={setSelectorShowing}/>}

                {/* Tag Inputs */}
                <div className="flex flex-col items-center p-5 gap-2 w-full">
                    <label className="mb-3 dark:text-gray-400 font-semibold" htmlFor="tags">Tags</label>
                    <div className="flex flex-wrap gap-5 justify-center">
                        <ComboBox name="tag" list={tagData} onChange={handleComboSelect}/>
                        {currentTags>1 && <ComboBox name="tag" list={tagData} onChange={handleComboSelect}/>}
                        {currentTags>2 && <ComboBox name="tag" list={tagData} onChange={handleComboSelect}/>}
                        {currentTags<3 &&<button className="dark:text-white" type="button" onClick={()=>setCurrentTags(currentTags+1)}>+</button>}
                    </div>
                </div>

                {/* Text Input */}
                <div className="flex flex-col justify-between items-center p-5 w-full">
                    <label className="mb-3 dark:text-gray-400 font-semibold" htmlFor="text">Text</label>
                    <textarea className="p-3 w-full resize-none h-40 post-input" type="text" id="text" placeholder="This the start of my adventure." value={text} onChange={(e)=>setText(e.target.value)}/>
                </div>

                <button type="submit" className="btn-primary w-3/5 mx-auto">Create Post</button>
                {message && <Message type={messageType} link={messageLink}>{message}</Message>}
            </form>

        </div>
    )
}
