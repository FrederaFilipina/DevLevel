import type { Response, Request } from "express";
import { authServices, type AuthServices } from "../services/AuthServices";
import { Prisma, type Usuario } from "@prisma/client";
import { ZodError } from "zod";



export class AuthController {
    constructor(private readonly services: AuthServices) {
        this.services

    }

    async createUser(req: Request, res: Response) {

        const datauser: Omit<Usuario, "id"> = req.body

        try {

            const creating = await this.services.createUser(datauser)

            return res.status(201).json({ message: "Usuário criado com sucesso", data: creating })


        } catch (error) {
          

            if (error instanceof ZodError) {

                const returns = error.issues[0]

                console.error(returns)

                return res.status(400).json({
                    message: returns?.message,
                    error: returns?.code,
                    path: returns?.path.join('.')
                })

            }

            if (error instanceof Prisma.PrismaClientKnownRequestError) {

                if (error.code === "P2002") {

                    return res.status(409).json({
                        message: "Email ja cadastrado",
                        error
                    })

                }
                if (error.code === 'P2025') {
                    return res.status(404).json({
                        message: "Usuário nao encontrado",
                        error
                    })

                }


            }

            
            return res.status(500).json({
                message: "Erro interno no servidor",
                error
            })
        }




    }

    async login(req: Request, res: Response) {

        const dataUsesr: Partial<Usuario> = req.body


        try {

            const login = await this.services.login(dataUsesr)

            return res.status(201).json({
                message: "Usuario logado",
                data: login
            })


        } catch (error) {

             if (error instanceof ZodError) {

                const returns = error.issues[0]

                console.error(returns)

                return res.status(400).json({
                    message: returns?.message,
                    error: returns?.code,
                    path: returns?.path.join('.')
                })

            }




            if (error instanceof Error) {

                return res.status(409).json({
                    message: error.message,
                    data: undefined

                })
            }

            return res.status(500).json({
                message: "Erro interno no servidor",
                error
            })
        }
    }
}


export const authController = new AuthController(authServices)