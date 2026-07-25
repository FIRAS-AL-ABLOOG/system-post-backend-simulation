const comment = require('../model/commentmodel');

const createComment = async (req, res) => {
    try {
        const {text} = req.body 
        const postid = req.params.postId; 

        if (!text || text.trim() === '') {
            return res.status(400).json({ message: 'التعليق فارغ!' });
        }

     
        const newComment = await Comment.create({
            post: postid,       
            user: req.user._id,  
            text: text  
        });

        return res.status(201).json({ status: 'success', data: newComment });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


const getpostcomment = async (req,res)=>{
    try{
        const postid = req.params.postid;
        const comments = await comment.find({
            post : postid
        })
        .populate('user' , 'name image')
        .sort({ createdAt: -1 });
            return res.status(200).json({
            status: 'success',
            results: comments.length,
            data: { comments }
        });
    }
     
    catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error retrieving comments',
            error: error.message
        });
    }
};

module.exports = {
    createComment,
    getpostcomment
};