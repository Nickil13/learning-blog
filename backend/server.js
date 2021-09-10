const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');
const { notFound, errorHandler} = require('./middleware/errorMiddleware');



dotenv.config();

const app = express();

app.use(express.json({limit: '50mb'}));
app.use(fileUpload());



// Routes
const postsRoute = require('./routes/postRoutes');
app.use('/api/posts',postsRoute);

const usersRoute = require('./routes/users');
app.use('/api/users',usersRoute);

const cloudinaryRoute = require('./routes/cloudinaryRoutes');
app.use('/api/cloudinary', cloudinaryRoute);


//Connect to DB
mongoose.connect(process.env.MONGO_URI, {useUnifiedTopology: true,
    useNewUrlParser: true, useCreateIndex: true},()=>{
        console.log("Connected to database!");
    }
    
)

//Middleware
app.use(notFound);
app.use(errorHandler);


app.listen(5000, ()=>console.log("Server is live!"));