const jwt = require("jsonwebtoken");

const auth =(req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1]
    // console.log(token)
    try {
        if(token){
            jwt.verify(token,"green_mentor",(err, decode)=>{
                if(err){
                    return res.status(400).send({message:"token not match"})
                }
                else{
                    
                    req.body.username = decode.username;
                    req.body.userId = decode.userId
                    next();
                }
            })
        }
    } catch (error) {
        return res.status(400).send({message:error.message})
    }
}
module.exports = auth