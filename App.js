var express = require('express')
var app = express()
var mongoose = require('mongoose')
var PersonModel = require('./Model')


//1) Install and setup mongoose:
var db = 'mongodb://127.0.0.1:27017/Person';
mongoose.connect(db,  {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('Database connection successful')
  })
  .catch(err => {
    console.error('Database connection error')
  })

var port = 8080
app.listen(port, () => {
    console.log('App listen on port ' + port)
})

//2) Create and Save a Record of a Model:
let person = new PersonModel({
    name: 'Alex',
    age: 25,
    favoriteFoods: ['Pizza', 'Hamburger', 'Sushi']
})
person.save((err, data) => {
    if (err) { console.log(err) }
})

//3) Create Many Records with model.create()
let doc = PersonModel.create([
    {
        name: 'Tiffany',
        age: 18,
        favoriteFoods: ['Takos', 'Karri', 'Boritos']
    },
    {
        name: 'Alexander',
        age: 40,
        favoriteFoods: ['Lasagna', 'Bottarga', 'Ribollita', 'Risotto']
    },
    {
        name: 'Hedi',
        age: 32,
        favoriteFoods: ['Koskous', 'Madfouna', 'Kafteji', 'Mloukhia', 'Mosli']
    },
    {
        name: 'Rim',
        age: 22,
        favoriteFoods: ['Jareesh', 'Mandi', 'Kabsa', 'Markook', 'Aseedah']

    }
])

//4) Use model.find() to Search Your Database:
var searchName = function (name, done) {

    let query = PersonModel.find({ name: name })
    query.exec(function (err, data) {
        if (err) return done(err)
        return done(null, data);
    });
}

//5) Use model.findOne() to Return a Single Matching Document from Your Database:
var searchFood = function (food, done) {
    PersonModel.findOne({ favoriteFoods: `Takos` }, function (err, data) {
        if (err) {
            return done(err);
        }
        return done(null, data);

    });

};

//6) Use model.findById() to Search Your Database By _id:
var searchId = (Id, done) => {
    PersonModel.findById(Id, (err, data) => err ? done(err) : done(null, data));
};

//7) Perform Classic Updates by Running Find, Edit, then Save:
var searchAndSave = function (Id, done) {
    let newFoodToADD = 'Shakshouka';
    let Person = PersonModel.findById(Id, function (err, person) {
        if (err) return console.log(err);
        person.favoriteFoods.push(newFoodToADD);
        person.save(function (err, data) {
            if (err) console.log(err);
            done(null, data)
        });
    })
}

//8) Perform New Updates on a Document Using model.findOneAndUpdate():
var searchAndSaveOne = function (name, done) {
    let newAge = 20;

    PersonModel.findOneAndUpdate(
        { name: name },
        { age: newAge },
        { new: true },
        (err, data) => {
            if (err) {
                done(err);
            }
            done(null, data);
        }
    )
};

//9) Delete One Document Using model.findByIdAndRemove:
var deleteId = function (Id, done) {
    PersonModel.findByIdAndRemove(Id, (err, data) => err ? done(err) : done(null, data));
};

//10) MongoDB and Mongoose - Delete Many Documents with model.remove():
var deleteManyPerson = function (done) {
    let name = "Mary";
    PersonModel.deleteMany({ name: name }, function (err, data) {
        if (err) {
            done(err);
        } else {
            done(null, data);
        }
    });
};

//11) Chain Search Query Helpers to Narrow Search Results:
var chainSearch = function (done) {
    let food = "Pizza";
    let jsonObject = { favoriteFoods: food };
    PersonModel.find(jsonObject).sort({ name: 1 }).limit(2).select({ age: 0 }).exec((err, data) => {
        (err) ? done(err) : done(null, data);
    })
};