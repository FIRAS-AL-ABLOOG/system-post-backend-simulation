const mongoose = require('mongoose');



const commentpost = mongoose.Schema({

    post : {
        type : mongoose.Schema.ObjectId,
        ref : 'post',
        required  : [true ]
    },
    user : {
        type : mongoose.Schema.ObjectId,
        ref : 'user',
        required : [true]
    },
    text : {
        type : String , required : true , trim : true , maxlength : 1000
    }
},
{
    timestamps : true
}
);
commentpost.index({ createdAt: -1 });
module.exports = mongoose.model('comment' , commentpost );


