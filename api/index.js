const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({dest : 'uploads/'});
const fs = require('fs');

const salt = bcrypt.genSaltSync(10);
const secret = 'asydg7236q54827b1uiy2ei12uge';

app.use(cors({credentials:true , origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
//To access the respective image
app.use('/uploads', express.static(__dirname + '/uploads'));

mongoose.connect('mongodb+srv://shrey0511:upX2Rv8jDDET5WIX@cluster0.gpfhoxl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');


app.post('/register',async (req,res)=>{
    const {username,password} = req.body;
    try {
        const userDoc = await User.create({
            username,
            password:bcrypt.hashSync(password,salt),
        });
        res.json(userDoc);
    } catch(e) {
        console.log(e);
        res.status(400).json(e);
    }
});

app.post('/login',async (req,res)=>{
    const {username,password} = req.body;
    const userDoc = await User.findOne({username});
    if (!userDoc) {
        console.log('User not found');
        return res.status(400).json('Wrong credentials!');
    }
    const passOk = bcrypt.compareSync(password, userDoc.password);
    //res.json(passOk);
    if(passOk){
        //logging in
        jwt.sign({username,id:userDoc._id},secret,{},(err,token)=>{
            if (err) throw err;
            res.cookie('token',token).json({
                id:userDoc._id,
                username,
            });
        });
        // console.log(token);
        // res.json({jwt : token});
    }else{
        //console.log('Incorrect password');
        res.status(400).json('Wrong credentials!');
    }
});

app.get('/profile',(req,res)=>{
    const {token} = req.cookies;
    jwt.verify(token,secret,{},(err,info)=>{
        if (err) throw err;
        res.json(info);
    });
});

app.post('/logout',(req,res)=>{
    res.cookie('token','').json('ok');
});

app.post('/post',uploadMiddleware.single('file'),async (req,res)=>{
    const {originalname , path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path+'.'+ext;
    fs.renameSync(path,newPath);

    const {token} = req.cookies;
    jwt.verify(token,secret,{},async (err,info)=>{
        if (err) throw err;
        const {title,summary,content} = req.body;
        const PostDoc = await Post.create({
            title,
            summary,
            content,
            cover:newPath,
            author:info.id,
        });
        res.json(PostDoc);
    });

    //Whenever you want to check a certain value works or not just do res.json on that variable
    //res.json({title,summary,content});
    //res.json({ext});
    //res.json(req.file); //To check the response we get after submitting an image
});

app.put('/post',uploadMiddleware.single('file'),async (req,res) => {
    let newPath = null;
    if(req.file){
        const {originalname , path} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path+'.'+ext;
        fs.renameSync(path,newPath);
    }

    const {token} = req.cookies;
    jwt.verify(token,secret,{},async (err,info)=>{
        if (err) throw err;
        const {id,title,summary,content} = req.body;
        const PostDoc = await Post.findById(id);
        const isAuthor = JSON.stringify(PostDoc.author) === JSON.stringify(info.id);
        if(!isAuthor){
            return res.status(400).json('You are not the author');
        }

        const updatedPost = await Post.findByIdAndUpdate(id, {
            title,
            summary,
            content,
            cover: newPath ? newPath : PostDoc.cover
        }, { new: true });
      
        res.json(updatedPost);

        // await PostDoc.update({
        //     title,
        //     summary,
        //     content,
        //     cover : newPath? newPath : PostDoc.cover,
        // });
        // res.json(PostDoc);
    });

});

app.get('/post',async (req,res) => {
    const posts = await Post.find()
    .populate('author',['username'])//As we dont need to fetch the password
    .sort({createdAt:-1})
    .limit(20)
    
    res.json(posts);
});

app.get('/post/:id',async (req,res)=>{
    const {id} = req.params;
    const PostDoc = await Post.findById(id).populate('author',['username']);
    res.json(PostDoc);
});


app.listen(4000);
