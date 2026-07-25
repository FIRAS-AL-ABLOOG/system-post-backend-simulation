const express = require('express');
const router = express.Router(); 

const {  
    createPost,     
    getPosts,
    deletePost,
    updatePost,
    togglePostLike 
} = require('../controllers/postcontroller');


router.route('/')
    .get(getPosts)         
    .post(createPost);    

router.route('/:id')
    .put(updatePost)       
    .delete(deletePost);   

router.patch('/:id/like', togglePostLike); 

module.exports = router;
