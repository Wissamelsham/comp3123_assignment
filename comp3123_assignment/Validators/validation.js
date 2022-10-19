module.exports.validateLogin = (username,password) =>{
    const errors = {};

    if(username.trim()===''){
        errors.username = 'Username Required';
    }

    if(password.trim()===''){
        errors.username = 'Password Required';
    }
    
    if(username.trim()==='' && password.trim()===''){
        errors.username = 'Username and Password Required';
    }
    

    return{
        errors,
        valid: Object.keys(errors).length<1
    };

}