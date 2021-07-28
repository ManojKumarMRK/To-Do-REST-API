const mongoose = require('mongoose');

//connecting to database
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser : true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connected to database successfully!")}).catch((error) => {
    console.log("Could not connect to database!")
});










