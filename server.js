const express = require('express') // import the express package


const app = express() // creates an instance of express Server




app.use(express.static('public')) // my app will serve all static files from public folder



const mongoose = require('mongoose')

async function conntentToDB(){
    try{
        // /database_name?
        await mongoose.connect('mongodb+srv://omar:1234@omar-cluster.dbwrx.mongodb.net/fruitsDB?appName=omar-cluster')
        console.log('Connection Successful')
    }
    catch(err){
        console.log('Error in Connection')
    }
}
conntentToDB()


// Schema and Model

const fruitsSchema = new mongoose.Schema({})


// Routes go here
app.get('/',(req,res)=>{
    res.render('homepage.ejs')
})





app.listen(3000,()=>{
    console.log('App is working')
}) // Listen on Port 3000
