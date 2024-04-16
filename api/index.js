const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');
const app = express();
const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');
const cookiePasrser = require('cookie-parser'); 
const multer = require('multer');
const uploadMiddleware = multer({dest: 'uploads/'});
const fs = require('fs');

const salt = bcrypt.genSaltSync(10);
const secret = '5u4dhbyi8na4wgrsem46w2b3'

app.use(cors({credentials:true, origin:'http://localhost:5173'}));
app.use(express.json());
app.use(cookiePasrser());

mongoose.connect('mongodb+srv://ganraoyu:071011Vz@cluster0.nh4trn5.mongodb.net/?retryWrites=true&w=majority')

app.post('/register',  async (request, response) => {
    const {username, password} = request.body;
    try{
        const userDoc = await User.create({
            username, 
            password: bcrypt.hashSync(password, salt)});
        response.json(userDoc);
    } catch(exception){
        console.log(exception)
        response.status(400).json({exception});
    }
});

app.post('/login', async (request, response) => {
    const {username, password} = request.body;
    const userDoc = await User.findOne({username});
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk){
        jsonWebToken.sign({username, id:userDoc._id}, secret, {}, (err, token) => {
            if(err) throw err;
            response.cookie('token', token).json({
                id: userDoc._id,
                username,
            });
        });
    } else {
        response.status(400).json("wrong username or password") 
    }
});

app.get('/profile', (request, response) => {
    const {token} = request.cookies;
    jsonWebToken.verify(token, secret, {}, (err, info) => {
        if (err) throw err;
        response.json(info);
    });
});

app.post('/logout', (request, response) => {
    response.cookie('token', '').json('ok');
})

app.post('/post', uploadMiddleware.single('file'), async (request, response) => {
    const {originalname, path} = request.file;
    const parts = originalname.split('.')
    const extention = parts[parts.length -  1]
    const newPath = path + '.' + extention; 
    fs.renameSync(path, newPath);

    const {title, summary, content} = request.body;
    const postDoc = await Post.create({
        title, summary, content, cover: newPath,
    });
    response.json(postDoc);
});

app.get('/post', async (request, response) => {
    const postDocs = await Post.find();
    response.json(postDocs);
});

app.listen(4000);

//mongodb+srv://ganraoyu:<password>@cluster0.nh4trn5.mongodb.net/?retryWrites=true&w=majorityx