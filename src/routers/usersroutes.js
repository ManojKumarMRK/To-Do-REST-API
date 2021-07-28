const express = require('express');
const path = require('path');
const User = require('../models/user');
const rootDir = require('../utils/path');
const router = new express.Router();

//adding post /users request with data
router.post('/users' , async (req,res) =>{
    //console.log(req.body);
    const newuser = new User(req.body);
    

    try{
      await  newuser.save();
      const token = await newuser.createAuthTokens();
      res.status(201).send({newuser, token});
      res.send
    }catch(err){
        res.status(400).send(err);
    };
   
});


//adding post /users/login request for login
router.post('/users/login', async(req, res) =>{
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.createAuthTokens();
        
        res.sendFile({user , token});

    }catch(err){
        res.status(400).send(err);
       

    }
});

//adding get /users request to read all users
router.get('/users' , (req,res) =>{
    
    User.find({}).then((data) => {
        
        res.sendFile(path.join(rootDir,'views','signup.html'));
    }).catch((err) => {
        res.status(500).send(err.message);
    });
    
});

//adding get /users/:id request to read a user of given id
router.get('/users/:id' , (req,res) =>{

    const _id = req.params.id;
    
    User.findById(_id).then((data) => {
        if(!data){
            return res.status(404).send("User not found!");
        }
        res.send(data);
    }).catch((err) => {
        res.status(500).send(err.message);
    });
    
});


//adding patch /users/:id request to update a user of given id
router.patch('/users/:id', async (req, res) => {
   
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) =>allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const user = await User.findById(req.params.id);
        updates.forEach((update) => user[update] = req.body[update]);
        await user.save();
        if (!user) {
        return res.status(404).send()
        }
        res.send(user)
       
    }catch (err) {
        res.status(400).send(err);
    }

});


//adding get /users/:id request to delete a user of given id
router.delete('/users/:id' , (req,res) =>{

    const _id = req.params.id;
    
    User.findByIdAndDelete(_id).then((data) => {
        if(!data){
            return res.status(404).send("User not found!");
        }
        res.send(data);
    }).catch((err) => {
        res.status(500).send(err.message);
    });
    
});




module.exports = router;