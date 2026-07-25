const express = require('express');
const router = express.Router({ mergeParams: true }); 

const {  
    createComment,
    getPostComments 
} = require('../controllers/commentController');


router.post('/', createComment);     
router.get('/', getPostComments);   
    
module.exports = router;
