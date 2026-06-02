import type { Request, Response } from "express";
import { userServices, type UserServices } from "../services/userServices";
import { verificarTokenAcesso } from "../utils/jwt";

export class UserController {
    constructor(private readonly services: UserServices) {
        this.services

    }

    async buscarUser(req: Request, res: Response) {

        const header = req.headers.authorization;

        if (!header?.startsWith("Bearer ")) {
            return res.status(401).json({
                error: "missing token"
            })
        }
        try {
            const token = header.slice("Bearer ".length)
            const payload = verificarTokenAcesso(token)
            if (!payload) return res.status(401).json({
                error: "invalid token"
            })

            res.status(200).json({
                message: "Usuario encontrado",
                data: await this.services.buscarUser(token)
            })

        } catch (error) {

            if (error instanceof Error) {

                return res.status(409).json({
                    message: error.message,
                    data: undefined

                })
            }


            return res.status(401).json({
                error: "invalid or expired token"
            })
        }

    }


    async deletar (req: Request, res: Response){

         const header = req.headers.authorization;

        if (!header?.startsWith("Bearer ")) {
            return res.status(401).json({
                error: "missing token"
            })
        }
        try {
            const token = header.slice("Bearer ".length)
            const payload = verificarTokenAcesso(token)
            if (!payload) return res.status(401).json({
                error: "invalid token"
            })

            res.status(200).json({
                message: "Usuario Deletado",
                data: await this.services.deletar(token)
            })

        } catch (error) {

            if (error instanceof Error) {

                return res.status(409).json({
                    message: error.message,
                    data: undefined

                })
            }


            return res.status(401).json({
                error: "invalid or expired token"
            })
        }

    }
}

export const userController = new UserController(userServices)