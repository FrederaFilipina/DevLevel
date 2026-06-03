
import z, { bigint } from "zod";
import { userRepository,  type UserRepository } from "../Repositories/userRepository";
import { getToken } from "../utils/jwt";
import { createHash } from "../utils/createHash";

interface EdicaoServices {

    token: string
    dadosAtualisado:string
}

export class UserServices {
    constructor(private readonly repository: UserRepository) {
        this.repository
    }

    async buscarUser(token: string) {
        const user = getToken(token)

        if (!user) {
            throw new Error("Token invalido")
        }

        return await this.repository.buscarUser(Number(user.id))
    }

    async deletar(token: string) {
        const user = getToken(token)

        if (!user) {
            throw new Error("Token invalido")
        }

        return await this.repository.deletar(Number(user.id))

    }

    async editarEmail({token, dadosAtualisado}: EdicaoServices) {

        const user = getToken(token)

        const editSchema = z.object({
            email: z.email("Email invalido")
        })

        if (!user) {
            throw new Error("Token invalido")
        }

        const validation = editSchema.parse({email:dadosAtualisado})


        return await this.repository.editarEmail({id:user.id,dadosAtualisado})

    }
    async editarSenha({ token, dadosAtualisado }: EdicaoServices) {
         const user = getToken(token)

        const editSchema = z.object({
            senha:z.string().min(6,"Senha precisa ter no mínimo 6 carácteres")
        })

        if (!user) {
            throw new Error("Token invalido")
        }

        const validation = editSchema.parse({senha:dadosAtualisado})

        const hash = await createHash(dadosAtualisado)


        return await this.repository.editarSenha({id:user.id,dadosAtualisado:hash})

        

    }
    async editarNome({ token, dadosAtualisado }: EdicaoServices) {
           const user = getToken(token)

        const editSchema = z.object({
            nome:z.string("Nome invalido")
        })

        if (!user) {
            throw new Error("Token invalido")
        }

        const validation = editSchema.parse({nome:dadosAtualisado})


        return await this.repository.editarNome({id:user.id,dadosAtualisado})


    }
    async editarBio({ token, dadosAtualisado }: EdicaoServices) {
           const user = getToken(token)

        const editSchema = z.object({
            bio:z.string("Bio invalido")
        })

        if (!user) {
            throw new Error("Token invalido")
        }

        const validation = editSchema.parse({nome:dadosAtualisado})


        return await this.repository.editarBio({id:user.id,dadosAtualisado})



    }
}




export const userServices = new UserServices(userRepository)