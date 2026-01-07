const router = require('express').Router()
const Fruit = require('../models/Fruit')


// --------------------------------------------------------
// READ: All Fruits
router.get('/',async(req,res)=>{
    const allFruits = await Fruit.find() // This gets me all the fruits
    res.render('all-fruits.ejs',{allFruits: allFruits})
})

// READ: One Fruit
router.get('/:id',async(req,res)=>{
     console.log(req.params)
     const foundFruit = await Fruit.findById(req.params.id) // Finds the 1 fruit with id that matches the id in the params
     res.render('fruit-details.ejs',{foundFruit: foundFruit}) // render the ejs page and send the found fruit to it
})
// --------------------------------------------------------





// --------------------------------------------------------
// CREATE


router.get('/new',(req,res)=>{
    res.render('new-fruit.ejs')
})

router.post('/fruits',async(req,res)=>{
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
router.get('/update/:id', async(req,res)=>{
    const foundFruit = await Fruit.findById(req.params.id)
    res.render('update-fruit.ejs',{foundFruit: foundFruit})
})

router.post('/update/:id', async (req,res)=>{
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
router.post('/delete/:id', async(req,res)=>{
    const deletedFruit = await Fruit.findByIdAndDelete(req.params.id)

    res.redirect('/fruits')
    
})




module.exports = router