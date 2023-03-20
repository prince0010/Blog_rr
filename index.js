    // nom add express
    //for login and register
    const express = require('express');//
    const cors = require('cors'); //
    const app = express();//
    const mongoose = require('mongoose');//
    const bcrypt = require('bcryptjs'); //
    const jwt = require('jsonwebtoken');//
    const cookieParser = require('cookie-parser');
    const multer = require('multer');
    const uploadMiddleware = multer({dest: 'uploads/'});
    const Post = require('./models/Post');
    const fs = require('fs'); //
    const User = require('./models/User.js');
   


    //hashing the password using bcryptjs
    const salt = bcrypt.genSaltSync(10);

    //This is for token cahracters
    //in cors if you are using credentials while theres a cors then you need to specify the information
    // and in cors if there's credentials then you need to make it as a true and credentials is in loginpage.js
    //  Configures the Access-Control-Allow-Credentials CORS header. Set to true to pass the header, otherwise it is omitted.
    const secret = 'asfqweetgkl124753qzxcfgklpoimnb';
    app.use(cors({credentials:true, origin:'http://localhost:3000'}));
    //for security purposes ,Ap
    app.use(express.json());
    app.use(cookieParser());
     //Endpoint for the Get the image so we can serve all the static files in the uploads folder
        //since we have the project inside in the same folder then we need to use the express.static(__dir + 'uploads) with this directory that currently running at the /uploads 
    app.use('/uploads', express.static(__dirname + '/uploads'));

    //Database connection
    // mongoose.connect('mongodb+srv://princenagacblog:JbTAESWFwceRJWjG@cluster0.nf3boir.mongodb.net/?retryWrites=true&w=majority');
    mongoose.connect('mongodb+srv://princenagacblog:JbTAESWFwceRJWjG@cluster0.nf3boir.mongodb.net/?retryWrites=true&w=majority');
   
    //Register
    app.post('/register', async (req,res) => {
        const {username, password} = req.body;
    try{
        //if the user is already registered then return success 
    // create user to database with username and password async and await
    const userDocs = await User.create({
        username, 
        password:bcrypt.hashSync(password, salt),
    });
    res.json(userDocs);
    }
    catch(err){
        res.status(400).json(err.message);
    }
    });


    //Login
    app.post('/login', async (req, res) => {
        const {username, password} = req.body;
    //Checking if user is already logged in and register in the database with username and password
    // User is from the User.js and it is a model object the User
    // findOne since its only 1 user per login is looking
    const useDocs = await User.findOne({username});
    // res.json(useDocs);
    //Password
    // if(useDocs && bcrypt.compa   reSync(password, useDocs.password)){
        //     res.json(useDocs);
        // }
        // else{
            //     res.status(400).json('Invalid Credentials');
            // }
            //Comparing the password from the request password and the user password or the useDocs.password
        const isPassEq = bcrypt.compareSync(password, useDocs.password);
        if(isPassEq){
                // If user is logged in 
                jwt.sign({username, id:useDocs._id}, secret, {}, (err, token) =>{
                    // if there's an error   
                    if(err) throw err;
                    // if no error then read the token
                        // res.json(token);
                        // Make nthe token as a cookie in  order to save it from every pages
                        res.cookie('token', token).json({
                            id:useDocs._id,
                            username,
                        });
                        // res.cookie('token', token).json('ok');
                        // res.json(token);
                });
        }
            else{
                res.status(400).json('Invalid Credentials');
            }
            // res.json(isPassEq);

        //JWT Token
    });
    //Profile if user is logged in 
        app.use('/profile', (req, res) => {
            // jwttoken with username and password with username and id that you can only read if you have the 'secret' which is naa sa taas katong secret= 'randomstrings' so it can only read in the backend side
            const {token} = req.cookies;
            // with this you can get the response information that is iat, id and username which is gikan sa database
            jwt.verify(token, secret, {}, (err, info) => {
                if(err) throw err;
                res.json(info);
            });
        });

    //Logout endpoint
    app.use('/logout', (req, res) => {
    res.cookie('token', '').json('token deleted and user logged out');
    });
    //UploadMiddleware Endpoint

    // uploadMiddleware.single('files') the 'files' is from the data.set('files', files[0]);
    app.use('/post', uploadMiddleware.single('file'), async(req, res) => {
        // We need to add a middleware function for the image{binary}
        // res.json('ok');
        //Gikan ni sa createnew article na data.set('file', files[0]);
        const {originalname,path} = req.file;
        //Parts have 2 part of array first is before the dot and the after which is the extension part like jpg, png, webp, jfif etc
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        //setting the file name with extension
        const newPath = path+'.'+ext;
        fs.renameSync(path, newPath);

            const {token} = req.cookies;
            jwt.verify(token, secret, {}, async(err, info) => {
            if(err) throw err;
            const {title, summary, content} = req.body;
            const PostDocu = await Post.create(
                {
                    title,
                    summary,
                    content,
                    cover:newPath,
                    // author:info.id,
                    author:info.id
                }
            );
                res.json(PostDocu);
            });
        });

      

        //Get request for getting the datas form tthe database
        // app.get('/posts', async(req, res) => {
        //     // Use the Post model from the Post.js like sa export ('Post', PostSchema)
                
        //     // res.json(await Post.find().populate('author', ['username']));
        //     res.json(await Post.find());
        // });

        app.get('/posts', async(req, res) => {
            // Use the Post model from the Post.js like sa export ('Post', PostSchema)
            //ang limit(20) is pila ang ipakita sa isa ka page or limited to 20 post sa and ang sort({createdAt: -1}) mao ning magbase kung desc or async ang sorting so pag i negative 1 (-1) is des which means kung usna ang new post ma put siya sa una jud or sa taas pag positive 1 (1) it means async ang sorting ana

            res.json( await Post.find().populate('author', ['username']).sort({createdAt: -1}).limit(20) );
        })
  
        


app.listen(4000);
//
//Username : princenagacblog
//password : JbTAESWFwceRJWjG