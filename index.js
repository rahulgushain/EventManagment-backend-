
const express = require('express');
const app = express()
const routes = require('./router/route')
require('dotenv').config()
const {dbconnect} = require('./Config/Configure')
const cors = require('cors');

app.use(cors());


app.use(express.json())
const Port = process.env.PORT

dbconnect()


if(!routes){
    console.log("router error")
}

app.use('/v2',routes)

app.get('/',(req,res)=>{
    res.send('hello this is Event Handler')
})


app.listen(Port,()=>{
    console.log('Server start At',Port)
})

