import jwt from "jsonwebtoken";
import User from "../models/userModels.js";
import asyncHandler from "./asyncHandler.js";

const authenticate=asyncHandler(async(req,res,next)=>{
    let token;

    //Read jwt from cookie
    token=req.cookies.jwt;

    if(token)
    {
        try{

            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            req.user=await User.findById(decoded.userId).select("-password");
            next();

        }
        catch(err)
        {
            res.status(401);
            throw new Error("Not authorized,token failed");
        }
    }
    else
    {
        res.status(401);
        throw new Error("not authorized,no token");
    }
});


//check for admin
const authorizeAdmin=(req,res,next)=>{
    if(req.user && req.user.isAdmin)
    {
        next();
    }
    else
    {
        res.status(401).send("not authorized as an admin");
    }
}
export {authenticate,authorizeAdmin};