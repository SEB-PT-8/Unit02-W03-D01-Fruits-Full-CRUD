const express = require('express') // import the express package

require('dotenv').config()
const app = express() // creates an instance of express Server

const {abdullah, omar} = require('./first')
console.log(process.env.STUDENT_NAME)


const morgan = require('morgan')
const fruitRoutes = require("./controllers/fruits.routes")
console.log(abdullah)

const Fruit = require('./models/Fruit')


const myStudent = {
    studentName: 'Ebrahim',
    course: 'SEB'
}

const {studentName, course} = myStudent
console.log(course)

app.use(express.static('public')) // my app will serve all static files from public folder
app.use(express.urlencoded({ extended: false }));

function ebrahimFunction(req,res,next){
    console.log('EBRAHIM')
    next()
}
app.use(ebrahimFunction)
const mongoose = require('mongoose')

app.use(morgan('dev'))

async function conntentToDB(){
    try{
        // /database_name?
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Connection Successful')
    }
    catch(err){
        console.log('Error in Connection')
    }
}
conntentToDB()




// Routes go here
app.get('/',(req,res)=>{
    res.render('homepage.ejs')
})

// 2 arguments
app.use('/fruits',fruitRoutes)


app.listen(3000,()=>{
    console.log('App is working')
}) // Listen on Port 3000
