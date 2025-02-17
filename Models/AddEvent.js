const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
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