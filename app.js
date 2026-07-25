const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json()); 


const postRouter = require('./Routes/postRouter'); 
app.use('/api/v1/posts', postRouter);

app.all('*', (req, res, next) => {
    return res.status(404).json({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on this server!`
    });
});



// const DB = process.env.DATABASE || 'mongodb://localhost:27017/socialMediaDB';
// const PORT = process.env.PORT || 3000;
// mongoose.connect(DB)
//     .then(() => {
//         console.log('✅ Database connection successful!');
      
//         app.listen(PORT, () => {
//             console.log(`🚀 Server is running on port ${PORT}...`);
//         });
//     })
//     .catch(err => {
//         console.error('❌ Database connection error:', err.message);
//     });

module.exports = app;
