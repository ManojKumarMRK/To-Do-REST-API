const mongoose = require('mongoose');
const validator = require('validator');

const taskSchema = new mongoose.Schema({
    description : {
        type : String,
        trim : true,
        required : true
    },
    completed : {
        type : Boolean,
        default : false
    }
});



//new data model Task
const Task = mongoose.model('Task', taskSchema);

//exporting task model
module.exports = Task;

