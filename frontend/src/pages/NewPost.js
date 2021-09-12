import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ComboBox from '../components/ComboBox';
import Message from '../components/Message';
import ImageInput from '../components/ImageInput';
import ImageSelector from '../components/ImageSelector';
import { useGlobalContext } from '../context';

export default function NewPost() {
    const[title,setTitle] = useState("");
    const[imageName,setImageName] = useState("default.jfif");
    const[imagePath,setImagePath] = useState("/images/default.jfif");
    const[tags,setTags] = useState([]);
    const[text,setText] = useState("");
    const[currentTags,setCurrentTags] = useState(1);
    const{userInfo} = useGlobalContext();
    const[message,setMessage] = useState("");
    const[messageType,setMessageType] = useState("default");
    const[messageLink,setMessageLink] = useState('');
    const[previewSource,setPreviewSource] = useState('');
    const[selectedImage,setSelectedImage] = useState(null);
    const[selectorShowing,setSelectorShowing] = useState(false);
    const[uploadedFile,setUploadedFile] = useState(null);

    const tagList = ['none','animals','food','travel','games','code','wellness'];
    
    useEffect(()=>{
        if(selectedImage){
            setImageName(`${selectedImage.public_id.split("/")[1]}.${selectedImage.format}`);
            setImagePath(selectedImage.url);
            setPreviewSource(selectedImage.url);
        }
    },[selectedImage])
    
    const previewFile = (file) => {
        console.log(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        }
        setUploadedFile(file);
    }

    const uploadImage = async(e) => {
        
        if(previewSource){
            //Upload to cloudinary
            try{
                const {data} = await axios.post('/api/cloudinary/upload', JSON.stringify({data: previewSource,file_name: uploadedFile.name}),
                {headers: {
                    'Content-Type': 'application/json'
                }} )
                
                
                const url = data.uploadedResponse.url;
                setImageName(uploadedFile.name);
                setImagePath(url);
               
                setMessageType("success");
                setMessage(`Uploaded image ${data.uploadedResponse.public_id}.`);
                
                }catch(error){
                    console.log(error.response.data);
                    setMessageType("error");
                    setMessage("Upload failed.");
                    
                }

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

    const addTag = () => {
        setCurrentTags(currentTags+1);
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        
        if(title && imagePath && tags && text){
            try{
                let config = {headers:{'Content-Type':'application/json', Authorization: `Bearer ${userInfo.token}`}};

                const {data} = await axios.post("/api/posts"
                ,{title,image: imagePath,tags,text},config);
                // console.log(data);
                setMessageLink(`/posts/${data._id}`);
                setMessage(`Successfully created post: ${title}`);
                setMessageType("success");
            }catch(error){
                if(error.response.status === 400){
                    setMessage(error.response.data.message);
                    setMessageType("error");
                }else if(error.response.status === 401){
                    setMessage("Unauthorized to create posts.");
                    setMessageType("error");
                }
                console.log(error);
            }
        }else{
            setMessage("Fields are not filled in.");
            setMessageType("error");
        }
        
    }
    return (
        <div className="grid md:grid-cols-2 place-items-center w-full">
            <h1 className="mb-10 md:col-span-2">New Post</h1>
            <div className="md:col-start-1 h-60 md:h-full w-full">
                <img className="object-cover w-full h-full" src={imagePath} onError={(e)=>{e.target.onerror =null; e.target.src="/images/default.jfif"}} alt="default" />
            </div>
            <form className="grid place-items-center md:col-start-2 " onSubmit={handleSubmit}>
                {/* Title Input */}
                <div className="flex flex-col md:flex-row justify-between items-center p-5">
                    <label className="mb-3 dark:text-gray-400 font-semibold" htmlFor="title">Title</label>
                    <input className="post-input" type="text" id="title" placeholder="My Adventure" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                </div>

                {/* Image Input */}
                <ImageInput name={imageName} 
                handleUploadSelect={previewFile} onUploadClick={uploadImage} setSelectorShowing={setSelectorShowing}/>
                
                {/* Image Selector */}
                {selectorShowing && <ImageSelector onSetSelected={setSelectedImage} setSelectorShowing={setSelectorShowing}/>}

                {/* Tag Inputs */}
                <div id="tag-box" className="flex flex-col md:flex-row justify-between items-center p-5 gap-2 w-full">
                    <label className="mr-5 mb-3 dark:text-gray-400 font-semibold" htmlFor="tags">Tags</label>
                    <div className="flex flex-wrap gap-5 justify-center">
                        <ComboBox name="tag" list={tagList} onChange={handleComboSelect}/>
                        {currentTags>1 && <ComboBox name="tag" list={tagList} onChange={handleComboSelect}/>}
                        {currentTags>2 && <ComboBox name="tag" list={tagList} onChange={handleComboSelect}/>}
                        {currentTags<3 &&<button className="dark:text-white" type="button" onClick={addTag}>+</button>}
                    </div>
                </div>

                {/* Text Input */}
                <div className="flex flex-col justify-between items-center p-5 w-full">
                    <label className="mr-5 mb-3 dark:text-gray-400 font-semibold" htmlFor="text">Text</label>
                    <textarea className="p-3 w-full resize-none h-40 post-input" type="text" id="text" placeholder="This the start of my adventure." value={text} onChange={(e)=>setText(e.target.value)}/>
                </div>

                <button type="submit" className="btn-primary w-3/5 mx-auto">Create Post</button>
                {message && <Message type={messageType} link={messageLink}>{message}</Message>}
            </form>

        </div>
    )
}
