const mongoose = require('mongoose')

const LoginSchema = new mongoose.Schema({
 
  Email:{
    type:String,
    require : true
  }, 
  Password:{
    type:String,
    require : true
  }, 

})

module.exports = mongoose.model('Login',LoginSchema)