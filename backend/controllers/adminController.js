import {Admin} from "../models/adminSchema.js";
import jwt from "jsonwebtoken";

export const admin_login = async(req,res)=>{
    try{
        const {username,password} = req.body;
        if(!username || !password){
            return res.status(400).json({message: "Please enter all fields" ,success:false});
        }
        const admin = await Admin.findOne({username:username});
        if(!admin){
            return res.status(401).json({message: "User not found"});
        };
        const token = jwt.sign({ userId: admin._id }, process.env.TOKEN_SECRET, { expiresIn: "1d" });
        if(password !== admin.password){
            return res.status(401).json({message: "Invalid username or password"});
        }
        return res.status(200).cookie("token",token,{
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 1 day expiration
        }).json({
            message:"Login Successfull",
            username : admin.username,
            name: admin.name,
            success:true,
            id: admin._id
        })


    }catch(error){
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}
 
export const admin_logout = async(req,res)=>{
    try{
        return res.status(200).clearCookie("token").json({message: "Logout Successfull"});
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}