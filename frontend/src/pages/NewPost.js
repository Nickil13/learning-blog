import axios from 'axios';
import React, { useState } from 'react';
import ComboBox from '../components/ComboBox';
import Message from '../components/Message';
import ImageInput from '../components/ImageInput';
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


    const tagList = ['none','animals','food','travel','games','code','wellness'];
    const imageTypes = ['image/png','image/jpeg'];

    const changeHandler = async (e) => {
        let file = e.target.files[0];
        if(file && imageTypes.includes(file.type)){
            
            //Upload the image
            const formData = new FormData();
            formData.append('file',file);
    
            try{
                const res = await axios.post('/api/upload', formData,
                {headers: {
                    'Content-Type': 'multipart/form-data'
                }} )
                const {fileName, filePath} = res.data;
                setImagePath(filePath);
                setImageName(fileName);
                
                }catch(error){
                    if(error.response.status === 500){
                        console.log("There was a problem with the server.");
                    }else{
                        console.log(error.response.data.msg);
                    }
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

                await axios.post("/api/posts"
                ,{title,image: imagePath,tags,text},config);

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
        <div className="grid md:grid-cols-2 place-items-center">
            <h1 className="mb-10 md:col-span-2">New Post</h1>
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
                <ImageInput name={imageName} onChange={changeHandler}/>
                

                {/* Tag Inputs */}
                <div id="tag-box" className="flex flex-col md:flex-row justify-between items-center p-5 gap-2">
                    <label className="mr-5 mb-3 dark:text-gray-400" htmlFor="tags">Tags</label>
                    <div className="flex flex-wrap gap-5 justify-center">
                        <ComboBox name="tag" list={tagList} onChange={handleComboSelect}/>
                        {currentTags>1 && <ComboBox name="tag" list={tagList} onChange={handleComboSelect}/>}
                        {currentTags>2 && <ComboBox name="tag" list={tagList} onChange={handleComboSelect}/>}
                    </div>
                    
                    
                    {currentTags<3 &&<button className="dark:text-white" type="button" onClick={addTag}>+</button>}
                </div>

                {/* Text Input */}
                <div className="flex flex-col justify-between items-center p-5">
                    <label className="mr-5 mb-3 dark:text-gray-400" htmlFor="text">Text</label>
                    <textarea className="p-3 w-full resize-none h-40 post-input" type="text" id="text" placeholder="This the start of my adventure." value={text} onChange={(e)=>setText(e.target.value)}/>
                </div>

                <button type="submit" className="btn-primary w-3/5 mx-auto">Create Post</button>
                {message && <Message type={messageType}>{message}</Message>}
            </form>

        </div>
    )
}
