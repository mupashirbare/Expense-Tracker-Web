const jw = require("jsonwebtoken");
const User = require("../models/User");


const generateToken=(id)=>{
    return jw.sign({id},process.env.JWT_SECRET,{expiresIn:"30d"})
}


const registerUser= async(req,res)=>{

    const {name, email,password}=req.body;
    try {
        const userExists= User.findOne({email})
        if(userExists) return res.status(400).json({message:"user all ready exist"})
        
        const user = User.create({name,email,password})
        res.status(300).json({
            id: user._id,
            name:user.name,
            email:user.email,
            password:user.password,
            token: generateToken(user.id),
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}
module.exports={registerUser}