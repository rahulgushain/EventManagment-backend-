const mongoose = require('mongoose')

const SignSchema = new mongoose.Schema({
  name:{
    type:String,
    require : true
  }, 
  email:{
    type:String,
    require : true
  }, 
  password:{
    type:String,
    require : true
  }, 
  DOB:{
    type:String,

  },
})

module.exports = mongoose.model('SignUp',SignSchema)