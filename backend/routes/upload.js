const express = require('express');
const router = express.Router();
const {access} = require('fs');
const { cloudinary } = require('../utils/cloudinary');



// @desc    Upload a file (in this case a post image)
// @route   POST /api/upload
// @access  Public
router.post('/', (req, res)=>{

    if(req.files === null){
        return res.status(400).json({msg:"No file was uploaded."});
    }
    
    const file = req.files.file;
    const newPath = `${process.cwd()}/frontend/public/uploads/${file.name}`;

    access(newPath, (error)=>{
        if(error){
            console.log("Image not yet downloaded");
            file.mv(newPath, error => {
                if(error){
                    console.error(error);
                    return res.status(500);
                }
                res.json({fileName: file.name, filePath:`/uploads/${file.name}`});
            })
        }else{
            // File exists, return path
            res.json({fileName: file.name, filePath: `/uploads/${file.name}`})
        }
    })
    

})

// @desc    Upload an image to cloudinary
// @route   POST /api/upload
// @access  Public
router.post('/cloudinary', async (req, res)=>{

    try{
        const fileStr = req.body.data;
        const uploadedResponse =await cloudinary.uploader.upload(fileStr, {
            folder: 'blog'
        })
        console.log(uploadedResponse);
        res.json({msg:"Successfully uploaded the image!"});
    }catch(error){
        console.error(error);
        res.status(400).json({error: "No file was uploaded."})
    }
  

})

module.exports = router;