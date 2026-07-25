const mongoose = require('mongoose');

const postgeneral = new mongoose.Schema({
author:{
    type:mongoose.Schema.ObjectId,
    ref:'User',
    required : [true] 
},
description : {
    type : String ,
    trim : true ,
    maxlength : [2000],
    default : ''
},
images : [{
    type : String ,
    required : true,
}],
status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'published',
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      }
    ],
  
},
{
    timestamps : true
});
postgeneral.index({ createdAt: -1 });
module.exports = mongoose.model('post' , postgeneral );