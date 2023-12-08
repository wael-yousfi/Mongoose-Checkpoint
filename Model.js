var mongoose = require('mongoose')
var Schema = mongoose.Schema

const PersonSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    favoriteFoods : {
        type: Array 
    }
})

module.exports= mongoose.model('Person', PersonSchema)