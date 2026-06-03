import { Router } from "express";
import {userController } from "../controller/UserController";




export const userRoutes = Router()


userRoutes.get("/",(req,res)=>{

    return userController.buscarUser(req,res)

})
userRoutes.delete("/",(req,res)=>{

    return userController.deletar(req,res)

})

userRoutes.put("/email",(req,res)=>{

    return userController.editarEmail(req,res)

})

userRoutes.put("/senha",(req,res)=>{

    return userController.editarSenha(req,res)

})

userRoutes.put("/bio",(req,res)=>{

    return userController.editarBio(req,res)

})

userRoutes.put("/nome",(req,res)=>{

    return userController.editarNome(req,res)

})





