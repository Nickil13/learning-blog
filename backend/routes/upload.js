const express = require('express');
const router = express.Router();
const {access} = require('fs');



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

module.exports = router;