import express from "express"
import {login,logout,signup,updateprofile,checkAuth} from "../controllers/auth.controller.js"    
import { protectroute } from "../middleware/auth.middleware.js";

const router=express.Router();

router.post("/signup",signup);

router.post("/login",login);

router.post("/logout",logout);

//the put method is used to update the existing content
//we use this to change the existing profile photo
//here protectroute is the middleware.
router.put("/update-profile",protectroute,updateprofile);

router.get("/check",protectroute,checkAuth);
export default router;