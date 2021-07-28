const express = require('express');
const Task = require('../models/tasks');
const User = require('../models/user');
const router = new express.Router();

//adding post /tasks request with data
router.post('/tasks' , (req,res) =>{
    const newtask = new Task(req.body);
    newtask.save().then((data) => {
        res.status(201).send(data);
    }).catch((err) => {
        res.status(400).send(err.message);
    });
    
});


//adding get /tasks request to read all users
router.get('/tasks' , (req,res) =>{
    
    Task.find({}).then((data) => {
        
        res.send(data);
    }).catch((err) => {
        res.status(500).send(err.message);
    });
    
});

//adding get /tasks/:id request to read a user of given id
router.get('/tasks/:id' , (req,res) =>{

    const _id = req.params.id;
    
    Task.findById(_id).then((data) => {
        if(!data){
            return res.status(404).send("User not found!");
        }
        res.send(data);
    }).catch((err) => {
        res.status(500).send(err.message);
    });
    
});

//adding patch /tasks/:id request to update a user of given id
router.patch('/tasks/:id', async (req, res) => {
   
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) =>allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const task = await Task.findById(req.params.id);
        updates.forEach((update) => task[update] = req.body[update]);
        await task.save();
        //updates.forEach((update) => task[update] = req.body[update]);
        if (!task) {
        return res.status(404).send()
        }
        res.send(task)
       
    }catch (err) {
        res.status(400).send(err);
    }

});







//adding get /tasks/:id request to read a user of given id
router.delete('/tasks/:id' , (req,res) =>{

    const _id = req.params.id;
    
    Task.findByIdAndDelete(_id).then((data) => {
        if(!data){
            return res.status(404).send("User not found!");
        }
        res.send(data);
    }).catch((err) => {
        res.status(500).send(err.message);
    });
    
});


module.exports = router;