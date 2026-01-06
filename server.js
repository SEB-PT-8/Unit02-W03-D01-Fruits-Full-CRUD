const express = require('express') // import the express package

require('dotenv').config()
const app = express() // creates an instance of express Server

const {abdullah, omar} = require('./first')
console.log(process.env.STUDENT_NAME)

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



const mongoose = require('mongoose')

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




// --------------------------------------------------------
// READ: All Fruits
app.get('/fruits',async(req,res)=>{
    const allFruits = await Fruit.find() // This gets me all the fruits
    res.render('all-fruits.ejs',{allFruits: allFruits})
})

// READ: One Fruit
app.get('/fruits/:id',async(req,res)=>{
     console.log(req.params)
     const foundFruit = await Fruit.findById(req.params.id) // Finds the 1 fruit with id that matches the id in the params
     res.render('fruit-details.ejs',{foundFruit: foundFruit}) // render the ejs page and send the found fruit to it
})
// --------------------------------------------------------





// --------------------------------------------------------
// CREATE


app.get('/fruits/new',(req,res)=>{
    res.render('new-fruit.ejs')
})

app.post('/fruits',async(req,res)=>{
    if(req.body.isReadyToEat){
        req.body.isReadyToEat = true
    }
    else{
        req.body.isReadyToEat = false
    }
    const createdFruit = await Fruit.create(req.body)

    res.redirect('/fruits')
})

// --------------------------------------------------------






// --------------------------------------------------------
// UPDATE ROUTES
app.get('/fruits/update/:id', async(req,res)=>{
    const foundFruit = await Fruit.findById(req.params.id)
    res.render('update-fruit.ejs',{foundFruit: foundFruit})
})

app.post('/fruits/update/:id', async (req,res)=>{
    if(req.body.isReadyToEat){
        req.body.isReadyToEat = true
    }
    else{
        req.body.isReadyToEat = false
    }

    const updatedFruit = await Fruit.findByIdAndUpdate(req.params.id, req.body)
    res.redirect('/fruits')
})




// --------------------------------------------------------
// DELETE Routes
app.post('/fruits/delete/:id', async(req,res)=>{
    const deletedFruit = await Fruit.findByIdAndDelete(req.params.id)

    res.redirect('/fruits')
    
})




// --------------------------------------------------------






app.listen(3000,()=>{
    console.log('App is working')
}) // Listen on Port 3000
