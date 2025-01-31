const express = require('express');
const { resolve } = require('path');
const db = require("./db")
const User = require('./schema');
const { error } = require('console');

const app = express();
app.use(express.json())

const port = 3010;

app.use(express.static('static'));

db()

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.post("/api/users",async(req,res)=>{
  try{
    const {name,email,password,createdAt} = req.body

    if(!name || !email || !password){
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newUser = new User({name,email,password,createdAt})
    await newUser.save()

    res.status(201).json({message:"Successful"})
  }
  catch{
    res.status(500).json({message:error.message})
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});