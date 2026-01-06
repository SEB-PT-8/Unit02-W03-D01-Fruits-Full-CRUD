const {Schema, model} = require('mongoose')
// Schema and Model

const fruitsSchema = new Schema({
    name:String,
    isReadyToEat: Boolean
})

const Fruit = model('Fruit',fruitsSchema)

module.exports = Fruit