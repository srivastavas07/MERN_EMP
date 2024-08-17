import jwt from "jsonwebtoken";
export const isAuthenticated = async(req,res,next) =>{
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(400).json({
                success:false,
                message:"User unauthorised..!!"
            })
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode.userId;
    }catch(error){
        console.log(error);
    }
}