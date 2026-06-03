import type{ PrismaClient } from "../prisma/generated/prisma/client";
import {prisma} from "../prisma/prisma"

export type Edicao ={
    id: number,
    dadosAtualisado:string

}


export class UserRepository{
    constructor(private readonly prisma:PrismaClient){
        this.prisma
    }

    async buscarUser(id:number){
        return await this.prisma.usuario.findUnique({
            where:{
                id:id
            },
            select:{
                id:true,
                nome:true,
                email:true,
                bio:true,
                avatarUrl:true,
                xp:true,
                nivel:true
            }
        })
    }


    async deletar(id:number){

      return  await this.prisma.usuario.delete({
            where:{
                id:id
            }
        })

    }

    async editarEmail({id,dadosAtualisado}:Edicao){

        return await this.prisma.usuario.update({
            where:{
                id:id
            },
            data:{
                email:dadosAtualisado
            }
        })

    }
    async editarSenha({id,dadosAtualisado}:Edicao){

        return await this.prisma.usuario.update({
            where:{
                id:id
            },
            data:{
                senha:dadosAtualisado
            }
        })

    }
    async editarNome({id,dadosAtualisado}:Edicao){

        return await this.prisma.usuario.update({
            where:{
                id:id
            },
            data:{
                nome:dadosAtualisado
            }
        })

    }
    async editarBio({id,dadosAtualisado}:Edicao){

        return await this.prisma.usuario.update({
            where:{
                id:id
            },
            data:{
                bio:dadosAtualisado
            }
        })

    }
}


export const userRepository = new UserRepository(prisma)