import type{ PrismaClient,Usuario,Token } from "../prisma/generated/client";
import {prisma} from "../prisma/prisma"

export class AuthRepository{
    constructor(private readonly prisma: PrismaClient){
        this.prisma

    }
    
    async createUser(dataUser:Partial<Usuario>){

        return await this.prisma.usuario.create({
            data:{
                email:dataUser.email||"",
                nome:dataUser.nome||"",
                senha:dataUser.senha||'',
                avatar_url:dataUser.avatarUrl,
                bio:dataUser.bio||null
            }
        })
    }

    async userExists(email:string){

       return await this.prisma.usuario.findUnique({
            where:{
                email:email
            }
        })

    }

    async createToken(dadosToken:Omit<Token,"id"|"revoked">){

        return await this.prisma.token.create({
            data:{
                expiresAt:dadosToken.expiresAt||"",
                token:dadosToken.token||"",
                type:dadosToken.type,
                usuarioId:Number(dadosToken.usuarioId)
            }
        })
    }

}


export const authRepository = new AuthRepository(prisma)