import type { Usuario } from "@prisma/client";
import { authRepository, AuthRepository } from "../repositories/authRepository";
import z, { email } from "zod";
import bcrypt from"bcrypt"
import { signTokenAcesso, signTokenRefresh } from "../utils/jwt";
import { createHash } from "../utils/createHash";


export class AuthServices{
    constructor(private readonly repository:AuthRepository){
        this.repository

    }


    async createUser(dadosUser:Omit<Usuario,"id">){

        const createUserSchema = z.object({
            nome:z.string(),
            email:z.email("Email invalido"),
            senha:z.string().min(6,"Senha precisa ter no mínimo 6 carácteres")
        })


        const dataValidation = createUserSchema.parse(dadosUser)

        const hash = await createHash(dadosUser.senha)

        const response = await this.repository.createUser({...dadosUser,senha:hash})

        return response

    }

    async login(dadosUser:Partial<Usuario>){

        const createUserSchema = z.object({
            email:z.email("Email invalido"),
            senha:z.string().min(6,"Senha precisa ter no mínimo 6 carácteres")

        })

        const dataValidation = createUserSchema.parse(dadosUser)

    
        const userExists = await this.repository.userExists(dadosUser.email||"")

       
        if (!userExists?.id) {

            throw new Error("Usuário não encontrado")
            
        }

        const credenciaisValidas = await bcrypt.compare(dadosUser.senha || "", userExists?.senha || "")

        if(userExists && credenciaisValidas){
            const tokenAcesso = signTokenAcesso({
                id: userExists.id,
                email: userExists.email,
                role: userExists.role
            })
            const tokenRefresh = signTokenRefresh({
               id: userExists.id,
                email: userExists.email,
                role: userExists.role
            }) 

            //refresh create
            const refreshExpires = new Date()
            const refreshExpiresUpdated = refreshExpires.setMonth(refreshExpires.getMonth() + 1)

            await this.repository.createToken({
                token: tokenRefresh,
                expiresAt: new Date(refreshExpiresUpdated),
                type: 'REFRESH',
                usuarioId: userExists.id
            })

            return {
                tokenAcesso,
                tokenRefresh
            }
        }
        
        throw new Error("Credenciais inválidas")
    }


}



export const authServices = new AuthServices(authRepository)




    
