
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const PersonCollection = require("./Models/Person");


passport.use(new LocalStrategy(async(USERNAME, password,done)=>{

    try {
        console.log("received credential",USERNAME,password);
        const user =  await PersonCollection.findOne({username:USERNAME});

        if(!user){
           return data(null,false,{message:"Incorrect username"});
        }
            
        // const isPasswordMatch = user.password ===password ? true:false; // first 
        const isPasswordMatch = await   user.comparePassword(password); //second 
        if(isPasswordMatch){
            return done(null,user);
        }else{
            return done(null,false,{message:"Incorrect password"})
        }


    } catch (error) {
        return done(error);
        
    }
}))

module.exports = passport;
