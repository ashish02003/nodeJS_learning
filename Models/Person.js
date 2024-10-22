const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({


    name:{
        type:String,
        required:true
    },

    age:{
        type:String
    },

    work:{
        type:String,
        work:['chef','waiter','manager'],
        required:true

    },

    mobile:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String
    },
    salary:{
        type:Number,
        required:true
    }




})


const PersonCollection =  mongoose.model("person",personSchema);


module.exports = PersonCollection;