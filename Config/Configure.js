const { default: mongoose } = require('mongoose')

require('dotenv').config()
const URL = process.env.DATABASE_URL;

if(!URL){
    console.log("Database URL is not correct");
    
}


exports.dbconnect = async()=>{
    try {
         
        await mongoose.connect(URL);
        console.log("database is connected")

    } catch (error) {
        console.log(error)
    }
}