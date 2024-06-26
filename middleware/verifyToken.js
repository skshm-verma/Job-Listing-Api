const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res ,next) => {
    try{
        const token = req.header('Authorization').split(' ')[1];
        if(!token) return res.status(401).json({message:'Token Not Found'});
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("Token Decoded: ",decoded);
        req.refUserId = decoded.userID;
        next();
        // bearer 3eduiqnfoceuib398q9fh0hcbaicb   -  this will be the value of the token variable and we need to extract 1st array element when we split
    }catch(error){
       return res.status(401).json({message: 'Token Not Found'});
    }
}

module.exports = verifyToken