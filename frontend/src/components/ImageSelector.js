import React, { useState, useEffect } from 'react'
import axios from 'axios';

export default function ImageSelector({onSetSelected, setSelectorShowing}) {
    const[selected,setSelected] = useState(null);
    const[images,setImages] = useState([]);
    const[previewImage,setPreviewImage] = useState('');

    useEffect(()=>{
        const getImages = async () => {
            try{
                const {data} = await axios.get('/api/cloudinary');
                console.log(data.resources);
                setImages(data.resources);
                if(data.resources[0]){
                    setPreviewImage(data.resources[0].url);
                    setSelected(data.resources[0]);
                }
                
                
            }catch(error){
                console.log(error);
            }  
        }
        getImages();
    },[])

    const handleClickItem = (image) => {
        setPreviewImage(image.url);
        setSelected(image);
    }
    const handleConfirmClick = () => {
        onSetSelected(selected);
        setSelectorShowing(false);
        setImages([]);
    }
    return (
        <div className="fixed z-10 top-0 right-0 bottom-0 left-0 grid place-items-center">
            <div className="grid bg-white border-8 border-gray-300 w-4/5 max-w-2xl mx-auto my-5 px-5 py-10 rounded-md shadow-md">
            <h2 className="text-2xl text-center pb-5 border-b-2 border-gray-300 font-semibold">Select an Image</h2>
            <div className="grid grid-cols-2 pt-5">
                <ul className="list-none mx-5 overflow-y-scroll pr-2">
                    {images && images.map((image,index)=>{
                        return(
                            <li key={index} className={`rounded-md bg-gray-200 mb-1 p-2 cursor-pointer hover:bg-gray-300 ${selected &&selected.asset_id === image.asset_id && "bg-purple-200 hover:bg-purple-300"}`} onClick={()=>handleClickItem(image)}>
                                {`${image.public_id.split("/")[1]}.${image.format}`}
                            </li>
                        )
                    })}
                </ul>
                <img className="object-cover h-60 w-full rounded" src={previewImage} alt=""/>
            </div>
            <div className="flex justify-around mt-5">
                <button id="select-btn" className="bg-gray-100 w-16 rounded py-1 hover:bg-gray-200" onClick={handleConfirmClick}>ok</button>
                <button className="bg-gray-100 w-16 rounded py-1 hover:bg-gray-200" onClick={()=>setSelectorShowing(false)}>cancel</button>
            </div>  
        </div>
        </div>
        
    )
}
