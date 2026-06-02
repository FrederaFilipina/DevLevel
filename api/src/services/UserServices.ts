
import { userRepository, type UserRepository } from "../repositories/userRepository";
import { getToken } from "../utils/jwt";

export class UserServices{
    constructor(private readonly repository:UserRepository){
        this.repository
    }

    async buscarUser(token:string){
        const user = getToken(token)

        if (!user) {
            throw new Error("Token invalido")
        }

        return await this.repository.buscarUser(Number(user.id))
    }

    async deletar(token:string){
        const user = getToken(token)

        if (!user) {
            throw new Error("Token invalido")
        }

        return await this.repository.deletar(Number(user.id))

    }
}

export const userServices = new UserServices(userRepository)