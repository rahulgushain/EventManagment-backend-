const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SignUp',
    required: true
  },
    date:{
        type:String,
        require : true
      }, 
      task:{
        type:String,
        require : true
      }, 
})

module.exports = mongoose.model('Event',EventSchema)