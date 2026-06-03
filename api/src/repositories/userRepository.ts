import type{ PrismaClient } from "../prisma/generated/client";
import {prisma} from "../prisma/prisma"

export type Edicao ={
    id: number,
    dadosAtualizados:string

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

    async editarEmail({id,dadosAtualizados}:Edicao){

        return await this.prisma.usuario.update({
            where:{
                id:id
            },
            data:{
                email:dadosAtualizados
            }
        })

    }
    async editarSenha({id,dadosAtualizados}:Edicao){

        return await this.prisma.usuario.update({
            where:{
                id:id
            },
            data:{
                senha:dadosAtualizados
            }
        })

    }
    async editarNome({id,dadosAtualizados}:Edicao){

        return await this.prisma.usuario.update({
            where:{
                id:id
            },
            data:{
                nome:dadosAtualizados
            }
        })

    }
    async editarBio({id,dadosAtualizados}:Edicao){

        return await this.prisma.usuario.update({
            where:{
                id:id
            },
            data:{
                bio:dadosAtualizados
            }
        })

    }

    async editar(id: number, data: any) {
        return await this.prisma.usuario.update({
            where: { id },
            data
        })
    }
}


export const userRepository = new UserRepository(prisma)