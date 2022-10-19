const express = require('express')
const router = express.Router()
const User = require('../models/user')
const {validateLogin} = require('../Validators/validation');
const authentication = require('../Validators/authentication');

const jsonwebtoken =require('jsonwebtoken');

require('dotenv').config();
generateToken = (user) =>{
    return jsonwebtoken.sign({
        id: user.id,
        email:user.email,
        username:user.username,
    },process.env.KEY,{expiresIn: '2h'});
}

//Signup
router.post('/signup',async (req,res)=>{

    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send('That user already exisits!');
    }else{
        const user = new User({
            username:req.body.username,
            email:req.body.email,
            password:req.body.password
         })
        
         try{
            const newUser = await user.save()
           //const token = generateToken(newUser);
            res.status(201).json(newUser)
         }catch(err){
            res.status(400).json({message:err.message})
         }
    }

})


//Login
router.get('/login/', async (req,res)=>{


    try{
        
    const {errors,valid} = validateLogin(req.body.username,req.body.password);
         
       
        if(!valid){
            return  res.status(400).json({errors})
        } 

        const users = await User.findOne({ username: req.body.username });

        if(!users){
            return  res.status(400).json({status:"false",message: "Invalid username or password"})
        }

        if (req.body.password!=users.password) {
            return  res.status(400).json({status:"false",message: "Invalid username or password"})
        }

        const token = generateToken(users);
        res.status(200).json({
            status:"true",
            username:users.username,
            message: "User logged in succesfully",
            jwt_token:token
        })
    }catch(err){
        res.status(500).json({message: err.message})
    }
})



module.exports= router