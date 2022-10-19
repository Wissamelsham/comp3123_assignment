const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        trim: true,
        lowercase: true,
        unique: [true, "Duplicate Username !!!"],
        required: [true, 'User Name Required'],
        maxlength:100
    },
    email:{
        type: String,
        required: true,
        unique: [true, "Duplicate Email !!!"],
        trim: true,
        maxlength:50,
        validate: function(value) {
          var emailValidation = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
          return emailValidation.test(value);
        }
    },
    password:{
        type: String,
        required: [true,'Password Required'],
        minlength:6,
        maxlength:50
    }
})

module.exports = mongoose.model('User',userSchema)