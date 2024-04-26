const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');
const fs = require('fs');
const app = express();
const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');
const cookieParser = require('cookie-parser'); 
const multer = require('multer');
const uploadMiddleware = multer({dest: 'uploads/'});


const salt = bcrypt.genSaltSync(10);
const secret = '5u4dhbyi8na4wgrsem46w2b3'

app.use(cors({credentials:true, origin:'http://localhost:5173'}));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + '/uploads'));

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
    if(userDoc){
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
    } else {
        response.status(400).json("User not found") 
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

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    const {originalname, path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);
  
    const {token} = req.cookies;
    jsonWebToken.verify(token, secret, {}, async (err, info) => {
      if (err) throw err;
      const {title, summary, content} = req.body;
      const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: newPath,
        author: info.id,
      });
      res.json(postDoc);
    });
});
  
 
app.put('/post', uploadMiddleware.single('file'), async (request, response) => {
    let newPath = null;
    if (request.file) {
      const {originalname, path} = request.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      newPath = path+'.'+ext;
      fs.renameSync(path, newPath);
    }
    const {token} = request.cookies;
    jsonWebToken.verify(token, secret, {}, async (err, info) => {
      if (err) throw err;
      const {id, title, summary, content} = request.body;
      const postDoc = await Post.findById(id);
      const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
      if(!isAuthor) {
        response.status(401).json('not the author');
        return;
      }
      await Post.findByIdAndUpdate(id, {title, summary, content, cover: newPath ? newPath : postDoc.cover}, {new: true});
      response.json({isAuthor, postDoc, info});
    });
});

app.get('/post', async (request, response) => {
    const posts = await Post.find()
        .populate('author')
        .sort({createdAt: -1})
        .limit(20);
    response.json(posts);
});

app.get('/post/:id', async (request, response) => {
    const {id} = request.params;
    const post = await Post.findById(id).populate('author', ['username']);
    response.json(post);
});

app.get('/profile/:id', async (request, response) => {
    const { id } = request.params;
  
    try {
      const user = await User.findById(id).select('-password');
  
      if (!user) {
        return response.status(404).json({ message: 'User not found' });
      }
      const posts = await Post.find({ author: user._id });
      const followers = await User.countDocuments({ following: user._id });
      const following = user.following.length;

      response.json({ ...user._doc, posts: posts.length, followers, following });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
});

app.post('/follow/:id', async (request, response) => {
    const { id } = request.params;
    const { userId } = request.body;
  
    try {
      const user = await User.findById(id);
      const follower = await User.findById(userId);
  
      if (!user || !follower) {
        return response.status(404).json({ message: 'User not found' });
      }
  
      user.followers.push(follower._id);
      follower.following.push(user._id);
  
      await user.save();
      await follower.save();
  
      response.json({ message: 'Followed successfully' });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
});


app.listen(4000);