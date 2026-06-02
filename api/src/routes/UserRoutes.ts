import { Router } from "express";
import {userController } from "../controller/UserController";




export const userRoutes = Router()


userRoutes.get("/",(req,res)=>{

    return userController.buscarUser(req,res)

})
userRoutes.delete("/",(req,res)=>{

    return userController.deletar(req,res)

})

