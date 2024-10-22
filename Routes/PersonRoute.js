const express = require("express")

const  router = express.Router();
const PersonCollection = require("../Models/Person")



router.post("/",async(req,res)=>{

    try {
         const data = req.body;
    
         const person = new PersonCollection(data);
         const savedPerson =  await person.save();
    
         res.status(200).json(savedPerson);
    
         console.log("saved Data!!");
    
    
    } catch (err) {
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }
    
    })
    
    
    router.get("/",async(req,res)=>{
    
       try{
        const data = await PersonCollection.find();
        res.status(200).json(data);
        console.log("fatched successfully");
    
       }catch(err){
       console.log(err);
        res.status(500).json({error:"Internal server error"});
       }
    })
    
    router.get("/:workType",async(req,res)=>{



        try {
    
            const workType = req.params.workType;
    
            if(workType=="chef"|| workType=="waiter"||workType=="manager"){
     
             const workData = await PersonCollection.find({work:workType})
             res.status(200).json(workData);
             console.log("fatched data successfully😎");
     
            }else{
                 res.status(400).json({Error:"invalid work type"})
     
            }
            
        } catch (error) {
    
            console.log(error);
             res.status(500).json({Error:"internal server error"})
            
        }
          
    
          
    
    })
    

    //comments for testing purpose
    module.exports = router;