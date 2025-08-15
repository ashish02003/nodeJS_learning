const express = require("express");
const app = express();

require('dotenv').config();
const port = process.env.PORT || 5000;
const db = require("./db");

const passport = require("./auth");
 
const bodyParser = require("body-parser");
app.use(bodyParser.json()); //req.body



//Middlewere function 
const logRequest = (req,res,next)=>{

    console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`)
    next();//move to the next phase
}

//yaha bas home wale route par moddleweare chalega

// app.get("/",logRequest,(req,res)=>{
//     res.send("Welcome to home page")
// })



 

   app.use(passport.initialize());

app.use(logRequest); //sabhi route par chalega

const localAuthMiddleware = passport.authenticate("local",{session:false});

app.get("/",(req,res)=>{
    res.send("Welcome to home page")
})




//import the route files
const personRoute  = require("./Routes/PersonRoute");
const menuRoute  = require("./Routes/MenuRoute");

//use the routers
app.use("/person",personRoute);
app.use("/menu",menuRoute);



app.listen(port,()=>{
    console.log(`listening to the port no:${port}`);
})