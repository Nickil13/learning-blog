const asyncHandler = require('express-async-handler');
const Post = require('../models/Post');

// @desc    Get paginated posts
// @route   GET /api/posts/admin
// @access  Private
const getAllPosts = asyncHandler(async (req,res)=>{
    const pageSize = 8;
    const page = Number(req.query.pageNumber) || 1;

    //sort criteria

    const count = await Post.countDocuments({});
    const posts = await Post.find({}).limit(pageSize).skip(pageSize * (page-1));

    res.json({posts, page, pages: Math.ceil(count/pageSize)});
})

// @desc    Get a limited amount of posts with cursor pagination
// @route   GET /api/posts
// @access  Public
const getPosts = asyncHandler(async (req,res)=>{
    let limit = 8;
    let posts = [];
    let filter = {};

    if(req.query.filter_category){
        filter = { 'tags':req.query.filter_category};
    }
    
    if(req.query.next_cursor){
        posts = await Post.find(filter).sort({createdAt:-1}).find({createdAt:{$lt: req.query.next_cursor}}).limit(limit);  
    }else{
        //First page
        posts = await Post.find(filter).sort({createdAt:-1}).limit(limit);
    }

    const nextPost = await Post.find(filter).sort({createdAt:-1}).find({createdAt:{$lt: posts[posts.length-1].createdAt}}).limit(1);

    if(posts.length<limit || nextPost.length===0){
        res.json({posts});
    }else{
        let next_cursor = posts[posts.length-1].createdAt;
        res.json({posts,next_cursor});
    }

    
})

// @desc    Get a specific post by id
// @route   GET /api/posts/:id
// @access  Public
const getPostById =  asyncHandler( async(req,res)=>{
    const post = await Post.findById(req.params.id);

    if(post){
        res.send(post);
    }else{
        res.setStatus(404);
        throw new Error("Post not found.");
    }
})

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
const createPost = asyncHandler(async (req, res) => {
    const { title, image, tags, text} = req.body;
    //Check if an existing post has the same title or image (not including the default)
    const postTitleExists = await Post.findOne({title});
    if(postTitleExists) return res.status(400).json({message: "Have a post with that title already!"});

    const post = new Post({
        title,
        text,
        tags,
        image,
    });
    try{
        const savedPost = await post.save();
        res.send(savedPost);
    }catch(error){
        res.status(400).send(error);
    }
})

// @desc    Update a draft
// @route   PUT /api/drafts
// @access  Private
const updateDraft =  asyncHandler(async (req,res)=>{
    const draft = await Post.findById(req.body.id);

    if(draft){
        draft.title = req.body.title || draft.title;
        draft.text = req.body.text || draft.text;
        draft.tags = req.body.tags || draft.tags;
        draft.image = req.body.image || draft.image;

        const updatedDraft = await draft.save();

        res.json({
            _id: updatedDraft._id,
            title: updatedDraft.title,
            text: updatedDraft.text,
            tags: updatedDraft.tags,
            image: updatedDraft.image,
        })
    }else{
        res.status(404);
        throw new Error("The draft you want to edit doesn't exist.");
    }
})

// @desc    Remove a draft
// @route   DELETE /api/drafts/:id
// @access  Private
const deleteDraft = asyncHandler(async (req,res)=>{
    await Post.findByIdAndDelete(req.params.id, (error)=>{
        if(error){
            console.error(error);
            return res.status(400).send("Error deleting the draft.");
        }else{
            res.send("Successfully deleted.");
        }
        
    }) 
})


module.exports = {getDrafts,createDraft, getDraftById, updateDraft, deleteDraft}