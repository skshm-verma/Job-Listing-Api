const validateNewUser = (req, res, next) => {
  
    const {name, email, password} = req.body
    if(!name || !email || !password){
        return res.status(400).json({
            message: 'Please provide all fields'
        })
    }
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //regularExpression to validate email
    if(!emailRegex.test(email)){
        return res.status(400).json({
           message: 'Please provide a valid email address'
        })
    }
    next();
}

module.exports = validateNewUser