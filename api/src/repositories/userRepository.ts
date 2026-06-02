import type{ PrismaClient } from "../prisma/generated/prisma/client";
import {prisma} from "../prisma/prisma"


export class UserRepository{
    constructor(private readonly prisma:PrismaClient){
        this.prisma
    }

    async buscarUser(id:number){
        return await this.prisma.usuario.findUnique({
            where:{
                id:id
            }
        })
    }


    async deletar(id:number){

        await this.prisma.usuario.delete({
            where:{
                id:id
            }
        })

    }
}


export const userRepository = new UserRepository(prisma)