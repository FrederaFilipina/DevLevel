import { Router } from "express";
import { authController } from "../controllers/AuthController";



export const authRoutes = Router()


authRoutes.post("/cadastro",(req,res)=>{

    return authController.createUser(req,res)

})
authRoutes.post("/login",(req,res)=>{

    return authController.login(req,res)

})

