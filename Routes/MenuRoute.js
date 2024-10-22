const express = require("express")

const  router = express.Router();
const menuCollection =require("../Models/Menu")

//create data...for menu items

router.post("/",async(req,res)=>{

    try {
        const data = req.body;
        const menuData = new menuCollection(data);
        const savedMenu = await menuData.save();

        res.status(200).json(savedMenu);

        console.log("saved data");

    } catch (error) {

        console.log(error);
        res.status(500).json({Error:"Internal server error"});
    }
    
})


//read all the data

router.get("/",async(req,res)=>{

    try {
        const menuData = await menuCollection.find();
        res.status(200).json(menuData);
        console.log("fatched successfully!!")

    } catch (error) {
        console.log(error);
        res.status(500).json({Error:"Internal server error"});
        
    }

})

//read the individual data for menu

// router.get("/:id",async(req,res)=>{

//     try {
//         // 
//         const _id = req.params.id; 
        
//         const findIndividualData = await menuCollection.findById(_id);
//         if(!findIndividualData){
          
//             res.status(400).json({Error:"Invalid test type"});
//         }else{
//             res.status(200).json(findIndividualData);
//             console.log("fatched individual data successfully🤗🤗")
//         }
       
        
//     } catch (error) {
        
//         console.log(error);
//         res.status(500).json({Error:"Internal server error"})
//     }

 

// })


//read the data by its taste
    router.get("/:tasteType",async(req,res)=>{

    try {

        const tasteType = req.params.tasteType;
        if(tasteType=="sweet"|| tasteType=="spicy"|| tasteType=="sour"){

            const tasteData = await menuCollection.find({taste:tasteType});
            res.status(200).json(tasteData)
            console.log("tasted is successfully!!");

        }else{
             
            res.status(400).json({Error:"Invalid work type"});

        }
      

    } catch (error) {
        console.log(error);
        res.status(500).json({Error:"Internal server error"})
        
    }

   
})


//update the individual data for menu

router.patch("/:id",async(req,res)=>{


    try {
        
        const _id = req.params.id;
        const updatedData  = await menuCollection.findByIdAndUpdate(_id,req.body,{
            new:true,//jaise he data update hoga turant data database me chala jayega
            runValidators:true,// jitane bhi schema me validation lagaye hai sabko validate karega
        })

        if(!updatedData){
            return res.status(400).json({Error:"Invalid object id"})
        }else{
            console.log("data updated!!")
            return res.status(200).json(updatedData)
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({Error:"internal server error"})
    }
  
})

//delete the data 

router.delete("/:id",async(req,res)=>{
    

    try {
        const _id = req.params.id;
        const deleteData = await  menuCollection.findByIdAndDelete(_id);

        if(!deleteData) {
            return res.status(400).json({error:"Invalid object id"})
            

        } else {
            console.log("Data is deleted!!");
            res.status(200).json(deleteData);
            
        }
    } catch (error) {
        console.log(error);
           res.status(500).json({Error:"internal server error"})
    }

})


module.exports = router;