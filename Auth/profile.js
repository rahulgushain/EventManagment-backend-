const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req,res,next)=>{
  

    try {
    
        const Secret_key =  process.env.Secret_key
        const token = req.header('Authorization');
        const actualToken = token.split(" ")[1];
    
        if(!actualToken){
            return res.status(400).json({
                success: false ,
                message: 'Access denied'
            })
        }
        const verified = jwt.verify(actualToken, Secret_key)
        req.userId = verified.userId
        next()

    } catch (error) {
        res.status(400).json({ success: false, message: 'Invalid token' });
    }
}