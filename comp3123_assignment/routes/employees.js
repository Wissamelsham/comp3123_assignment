const express = require('express')
const router = express.Router()
const Employee = require('../models/employee')
const authentication = require('../Validators/authentication');


//Get all employee list
router.get('/employees', async (req,res)=>{
    const auth = authentication(req)

        try{
            if(auth){
                const employees = await Employee.find()
                res.status(200).json(employees)
            }
        }catch(err){
            res.status(500).json({message: err.message})
        }
   

})


//Create new employee
router.post('/employees',async (req,res)=>{
 const employee = new Employee({
    first_name:req.body.first_name,
    last_name:req.body.last_name,
    email:req.body.email
    // gender:req.body.gender,
    // salary:req.body.salary
 })
 const auth = authentication(req)
 try{
    if(auth){
    const newEmployee = await employee.save()
    res.status(201).json(newEmployee)
    }
 }catch(err){
    res.status(400).json({message:err.message})
 }
})

//Get employee details by employee id
router.get('/employees/:id',async (req,res)=>{
    const auth = authentication(req)
    if(auth){
        const employee = await Employee.findById(req.params.id)
        res.status(200).json(employee)
    }
})

//Update employeee details
router.put('/employees/:id',async (req,res)=>{

    const auth = authentication(req)
      const id = req.params.id
      try{
        if(auth){
            const updateEmployee = await Employee.findByIdAndUpdate(id,req.body)
            res.status(200).json({message:"Updated Succesfully", updatedDetails: req.body});
        }
     }catch(err){
        res.status(400).json({message:err.message})
     }

})

//Delete employee by employee id
router.delete('/employees/:id',async (req,res)=>{
   const auth = authentication(req)
    const id = req.params.id
    try{
        const updateEmployee = await Employee.findByIdAndRemove(id)
        .then(data =>{
            if(!data){
                res.status(404).send({
                    message: `Cannot delete Emloyee with id=${id}. Maybe Employee was not found!`
                  });
            }else{
                res.status(200).send({
                    message: "Deleted Succesfully"
                  })
            }

            
        })
       

     }catch(err){
        res.status(400).json({message:err.message})
     }
})

module.exports= router