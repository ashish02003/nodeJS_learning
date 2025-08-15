const jwt = require("jsonwebtoken");

const jwtAuthmiddleware = (req, res, next) => {

  //First check request headers has authorization or not
  const authorization = req.headers.authorization;
  if(!authorization) return res.status(401).json({error:"Token not found"});
  

  const token = req.headers.Authorization.split("")[1];
  if (!token) return res.status(401).json({ error: "unauthorized" });

  try {
    //verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userPayload = decoded; //attach user information to the  request object
    next();

  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Invalid Token" });
  }

};



 //Function to generate JWT token 

 const generateToken = (userData)=>{
     
    return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:30000});
  }


module.exports =  {jwtAuthmiddleware,generateToken};
