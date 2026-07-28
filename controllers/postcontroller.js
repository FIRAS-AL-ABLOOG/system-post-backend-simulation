const post = require('../model/postmodel');

const createpost = async (req,res)=>{
    try{
        if (!req.body.images || req.body.images.length === 0){
            return res.status(400).json({
                status : 'fail' , message : 'Please upload at least one image'
            })
        };
        const newpost = await post.create(
            {
                author : req.user._id,
                images : req.body.images , 
                description : req.body.description 

            }
        );
        res.status(201).json({
            status : "success" ,
             message : "Post created successfully"  ,
              data : {newpost}
        });
    }
    catch(error){
        return res.status(500).json({
            status : "error" , message: "Error creating post",
            error: error.message
        });
    }
};

const getpost = async (req,res)=>{
    try{
        const posts = await post.find()
        .populate('author' , 'name image')
        .populate('recentComments.user', 'name image')
        .sort({createdAt: -1 })
        res.status(200).json({
            status : 'success' , message : 'Posts retrieved successfully' ,
             data :{posts}
        });
    }
    catch(error){
        return res.status(500).json({
            status : "error" , message : "Error retrieving posts",
              error: error.message
        });
    }
};


const deletePost  = async (req,res)=>{
    try{
   const deletedpod = await post.findByIdAndDelete(req.params.id);
  if   (!deletedpod){
    return res.status(404).json({
        status : ' fail' , message : 'The post is not found'
    })
   };
   return res.status(200).json({
    status : 'success' , message : 'Post deleted successfully'
   })
    }
    catch(error){
        return res.status(500).json({
            status : 'error' , message : 'Post deletion error'
        })
    }
};

 const updatePost  = async (req,res)=>{
    try{
        const updatedPost = await post.findByIdAndUpdate(
            req.params.id,req.body,
            {
                 new : true ,
                 runValidators : true
            }
        );
        if(!updatedPost){
               return res.status(404).json({
                status: 'fail',
                message: 'The post is not found'
            });
        };

             return res.status(200).json({
            status: 'success',
            message: 'Post updated successfully',
            data: { updatedPost }
        });
    


    }
    catch(error){
             return res.status(500).json({
            status: 'error',
            message: 'Post update error',
            error: error.message
        });
    }

 };

const togglePostLike = async (req, res) => {
    try {
        const postId = req.params.id; 
        const userId = req.user._id;  

       
        const currentPost = await post.findById(postId);

        if (!currentPost) {
            return res.status(404).json({
                status: 'fail',
                message: 'The post is not found'
            });
        }


        const isLiked = currentPost.likes.includes(userId);

        if (isLiked) {
           
            await post.findByIdAndUpdate(postId, {
                $pull: { likes: userId }
            });

            return res.status(200).json({
                status: 'success',
                message: 'Like removed successfully'
            });
        } else {
         
            await post.findByIdAndUpdate(postId, {
                $addToSet: { likes: userId }
            });

            return res.status(200).json({
                status: 'success',
                message: 'Post liked successfully'
            });
        }
    } 
    catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error toggling like',
            error: error.message
        });
    }
};


 module.exports = {
    createpost,
    getpost,
    deletePost,
    updatePost,
    togglePostLike
 };
