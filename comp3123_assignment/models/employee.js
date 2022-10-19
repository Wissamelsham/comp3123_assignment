const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    first_name:{
        type: String,
        trim: true,
        required: [true, 'First Name Required'],
    },
    last_name:{
        type: String,
        trim: true,
        required: [true, 'Last Name Required'],
    },
    email:{
        type: String,
        required: true,
        unique: [true, "Duplicate Email !!!"],
        trim: true,
        validate: function(value) {
          var emailValidation = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
          return emailValidation.test(value);
        }
    },
    gender:{
        type: String,
        required: [true,'Gender Required'],
    },
    salary:{
        type: Number,
        required: [true,'Salary Required'],
    }
})

module.exports = mongoose.model('Employee',employeeSchema)