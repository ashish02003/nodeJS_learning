const mongoose = require("mongoose");

const mongoURL = "mongodb://0.0.0.0:27017/prince";

mongoose.connect(mongoURL)

const db = mongoose.connection;

db.on("connected",()=>{
    console.log("connected to Mongodb server");
})

db.on("error",(err)=>{
    console.log("Mongodb connection error:",err);
})

db.on("disconnected",()=>{
    console.log("disconnected to mongodb");
})

module.exports = db;

