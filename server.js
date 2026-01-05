const express = require('express') // import the express package


const app = express() // creates an instance of express Server




app.use(express.static('public')) // my app will serve all static files from public folder
app.use(express.urlencoded({ extended: false }));



const mongoose = require('mongoose')

async function conntentToDB(){
    try{
        // /database_name?
        await mongoose.connect('mongodb+srv://omar:123@omar-cluster.dbwrx.mongodb.net/fruitsDB?appName=omar-cluster')
        console.log('Connection Successful')
    }
    catch(err){
        console.log('Error in Connection')
    }
}
conntentToDB()


// Schema and Model

const fruitsSchema = new mongoose.Schema({
    name:String,
    isReadyToEat: Boolean
})

const Fruit = mongoose.model('Fruit',fruitsSchema)






// Routes go here
app.get('/',(req,res)=>{
    res.render('homepage.ejs')
})


app.get('/fruits',async(req,res)=>{
    const allFruits = await Fruit.find() // This gets me all the fruits
    res.render('all-fruits.ejs',{allFruits: allFruits})
})

app.post('/fruits/delete/:id', async(req,res)=>{
    const deletedFruit = await Fruit.findByIdAndDelete(req.params.id)

    res.redirect('/fruits')
    
})

app.get('/fruits/update/:id', async(req,res)=>{
    res.render('update-fruit.ejs')
})

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

app.get('/fruits/:id',async(req,res)=>{
     console.log(req.params)
     const foundFruit = await Fruit.findById(req.params.id) // Finds the 1 fruit with id that matches the id in the params
     res.render('fruit-details.ejs',{foundFruit: foundFruit}) // render the ejs page and send the found fruit to it
})






app.listen(3000,()=>{
    console.log('App is working')
}) // Listen on Port 3000
