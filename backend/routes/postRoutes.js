const express = require('express');
const {protect} = require('../middleware/authMiddleware');
const {getPosts,createPost, getPostById, updatePost, deletePost, getAllPosts} = require('../controllers/postController');

const router = express.Router();


router.route('/')
    .get(getPosts)
    .post(protect, createPost)
    .put(protect,updatePost);

router.route('/:id')
    .get(getPostById)
    .delete(protect,deletePost);

router.route('/admin')
    .get(getAllPosts);
module.exports = router;
