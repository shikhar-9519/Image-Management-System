const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const server = express();
server.use(cors());
server.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/LoginForm', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a mongoose schema
const loginFormSchema = new mongoose.Schema({
  userName: String,
  password: String,
});

// Create a mongoose model based on the schema
const UserData = mongoose.model('userData', loginFormSchema);


server.post('/login', async(req,res)=>{
    try {
        const existingUser = await UserData.findOne({userName: req.body.username});
        if(!existingUser){
            return res.status(400).json({error: "User doesn't exist. Please register"});
        }
        console.log(existingUser);
        if (existingUser.password !== req.body.password) {
            return res.status(400).json({ error: 'Incorrect password. Please try again.' });
          }
          return  res.json({ message: 'Login successful' });
    } catch (error) {
        console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

server.post('/register', async (req, res) => {
    try {
      const existingUser = await UserData.findOne({ userName: req.body.username });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists. Please login' });
      }
      const userData = new UserData({
        userName: req.body.username,
        password: req.body.password,
      });
  
      await userData.save();
      res.json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

server.listen(8000,()=>{
    console.log('Server running on 8000');
});