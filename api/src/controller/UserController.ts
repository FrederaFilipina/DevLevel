import type { Request, Response } from "express";
import { userServices, type UserServices } from "../services/UserServices";
import { verificarTokenAcesso } from "../utils/jwt";
import type { Usuario } from "../prisma/generated/client";
import { ZodError } from "zod";


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

    async deletar(req: Request, res: Response) {

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

    async editarEmail(req: Request, res: Response) {

        const header = req.headers.authorization;
        const { email }: Partial<Usuario> = req.body

        if (!header?.startsWith("Bearer ")) {
            return res.status(401).json({
                error: "missing token"
            })
        }
        try {

            const token = header.slice("Bearer ".length)


            res.status(200).json({
                message: "Email modificado",
                data: await this.services.editarEmail({ token, dadosAtualizados: email || "" })
            })

        } catch (error) {

            if (error instanceof Error) {

                return res.status(409).json({
                    message: error.message,
                    data: undefined

                })
            }
            if (error instanceof ZodError) {

                const returns = error.issues[0]

                console.error(returns)

                return res.status(400).json({
                    message: returns?.message,
                    error: returns?.code,
                    path: returns?.path.join('.')
                })

            }


            return res.status(401).json({
                error: "invalid or expired token"
            })
        }

    }

    async editarSenha(req: Request, res: Response) {

        const header = req.headers.authorization;
        const { senha }: Partial<Usuario> = req.body

        if (!header?.startsWith("Bearer ")) {
            return res.status(401).json({
                error: "missing token"
            })
        }
        try {

            const token = header.slice("Bearer ".length)


            res.status(200).json({
                message: "Senha modificado",
                data: await this.services.editarSenha({ token, dadosAtualizados: senha || "" })
            })

        } catch (error) {

            if (error instanceof Error) {

                return res.status(409).json({
                    message: error.message,
                    data: undefined

                })
            }
            if (error instanceof ZodError) {

                const returns = error.issues[0]

                console.error(returns)

                return res.status(400).json({
                    message: returns?.message,
                    error: returns?.code,
                    path: returns?.path.join('.')
                })

            }


            return res.status(401).json({
                error: "invalid or expired token"
            })
        }

    }

    async editarNome(req: Request, res: Response) {
        const header = req.headers.authorization;
        const { nome }: Partial<Usuario> = req.body

        if (!header?.startsWith("Bearer ")) {
            return res.status(401).json({
                error: "missing token"
            })
        }
        try {

            const token = header.slice("Bearer ".length)


            res.status(200).json({
                message: "Nome modificado",
                data: await this.services.editarNome({ token, dadosAtualizados: nome || "" })
            })

        } catch (error) {

            if (error instanceof Error) {

                return res.status(409).json({
                    message: error.message,
                    data: undefined

                })
            }
            if (error instanceof ZodError) {

                const returns = error.issues[0]

                console.error(returns)

                return res.status(400).json({
                    message: returns?.message,
                    error: returns?.code,
                    path: returns?.path.join('.')
                })

            }


            return res.status(401).json({
                error: "invalid or expired token"
            })
        }


    }
    async editarBio(req: Request, res: Response) {
          const header = req.headers.authorization;
        const { bio }: Partial<Usuario> = req.body

        if (!header?.startsWith("Bearer ")) {
            return res.status(401).json({
                error: "missing token"
            })
        }
        try {

            const token = header.slice("Bearer ".length)


            res.status(200).json({
                message: "Bio modificado",
                data: await this.services.editarBio({ token, dadosAtualizados: bio || "" })
            })

        } catch (error) {

            if (error instanceof Error) {

                return res.status(409).json({
                    message: error.message,
                    data: undefined

                })
            }
            if (error instanceof ZodError) {

                const returns = error.issues[0]

                console.error(returns)

                return res.status(400).json({
                    message: returns?.message,
                    error: returns?.code,
                    path: returns?.path.join('.')
                })

            }


            return res.status(401).json({
                error: "invalid or expired token"
            })
        }

    }

    async editar(req: Request, res: Response) {
        const header = req.headers.authorization;
        if (!header?.startsWith("Bearer ")) {
            return res.status(401).json({ error: "missing token" })
        }
        try {
            const token = header.slice("Bearer ".length)
            const result = await this.services.editar(token, req.body)
            res.status(200).json({
                message: "Perfil atualizado",
                data: result
            })
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    message: error.issues[0]?.message,
                    error: error.issues[0]?.code
                })
            }
            return res.status(409).json({
                message: error instanceof Error ? error.message : "Erro interno"
            })
        }
    }
}

export const userController = new UserController(userServices)