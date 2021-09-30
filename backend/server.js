const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');
const { notFound, errorHandler} = require('./middleware/errorMiddleware');



dotenv.config();

const app = express();

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}
app.use(express.json({limit: '50mb'}));
app.use(fileUpload());



// Routes
const postsRoute = require('./routes/postRoutes');
app.use('/api/posts',postsRoute);

const usersRoute = require('./routes/userRoutes');
app.use('/api/users',usersRoute);

const cloudinaryRoute = require('./routes/cloudinaryRoutes');
app.use('/api/cloudinary', cloudinaryRoute);


//Connect to DB
mongoose.connect(process.env.MONGO_URI, {useUnifiedTopology: true,
    useNewUrlParser: true, useCreateIndex: true},()=>{
        console.log("Connected to database!");
    }
    
)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(path.resolve(), '/frontend/build')));
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(path.resolve(), 'frontend', 'build', 'index.html'));
    })
    
}else{
    app.get('/'), (req, res) =>{
        res.send("API is running");
    }
}

//Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log("Server is live!"));