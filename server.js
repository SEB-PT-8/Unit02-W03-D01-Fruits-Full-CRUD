const express = require('express') // import the express package


const app = express() // creates an instance of express Server




app.use(express.static('public')) // my app will serve all static files from public folder




// Routes go here
app.get('/',(req,res)=>{
    res.render('homepage.ejs')
})





app.listen(3000,()=>{
    console.log('App is working')
}) // Listen on Port 3000
