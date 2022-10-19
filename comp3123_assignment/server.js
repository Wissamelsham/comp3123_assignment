const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const port = process.env.PORT
const uri = process.env.ATLAS_URI
//const jwt =require('jsonwebtoken');

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");    
}).catch(err => {
    console.log('Could not connect to the database.', err);
    process.exit();
});

app.use(express.json())
const usersRouter = require('./routes/users')
app.use('/api/user',usersRouter)

const employeesRouter = require('./routes/employees')
app.use('/api/emp',employeesRouter)

mongoose.connect(uri)
app.listen(port,()=> console.log("Server Started on Port "+port))