const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const User = require('./models/User');
const app = express();


app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://ganraoyu:071011Vz@cluster0.nh4trn5.mongodb.net/?retryWrites=true&w=majority')

app.post('/register',  async (request, response) => {
    const {username, password} = request.body;
    try{
        const userDoc = await User.create({username, password});
        response.json(userDoc);
    } catch(exception){
        response.status(400).json({exception});
    }
});

app.listen(4000);

//mongodb+srv://ganraoyu:<password>@cluster0.nh4trn5.mongodb.net/?retryWrites=true&w=majority