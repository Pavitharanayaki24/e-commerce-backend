const jwt= require('jsonwebtoken');


const auth = (req,res,next)=>{
   // const token = req.header('Authorization').replace('Bearer ',"") // extract the token from header getting in the form of splitted form(replace is used)
   //                                        or
   const token= req.header("Authorization").split(' ')[1];//sperating token alone 
    if(!token){
        return res.status(401).json({msg:"No token, authorization denied"});
    }
    try{
        const decoded = jwt.verify(token,"secret_key");
        //console.log(decoded);//verifying the token with the secret key that is generated during token genration at login time
        
        req.user = decoded;
        
        //console.log(decoded.userID)//id will be generated and that will be passed to frontend
        next();//passing to next process
    }catch(err){
        res.status(401).json({msg:"Token is not valid"});
    }
};
module.exports = auth;