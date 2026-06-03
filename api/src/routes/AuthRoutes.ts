import { Router } from "express";
import { authController } from "../controller/AuthController";



export const authRoutes = Router()


authRoutes.post("/cadastro",(req,res)=>{

    return authController.createUser(req,res)

})
authRoutes.post("/login",(req,res)=>{

    return authController.login(req,res)

})

