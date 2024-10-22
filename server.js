const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const db = require("./db");

 
const bodyParser = require("body-parser");
app.use(bodyParser.json()); //req.body


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