const express = require('express');
require('./db/mongoose');
const userrouter = require('./routers/usersroutes');
const taskrouter = require('./routers/taskroutes');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
//using the routers from other files
app.use(userrouter);
app.use(taskrouter);



//listening to port
app.listen(port , () =>{
    console.log("Server is running on port ",port);
});






