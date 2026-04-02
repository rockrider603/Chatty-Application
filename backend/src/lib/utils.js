import jwt from "jsonwebtoken"

export const generateToken=(UserId,res)=>{
    const token=jwt.sign({UserId},process.env.JWT_secret,{
        expiresIn:"7d",
    });
    //here jwt is the name of the cookie
    res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000,//MS
        httpOnly:true,
        sameSite:"strict",
        secure: process.env.NODE_ENV!=="development",
    });

    return token;
}

export default generateToken;