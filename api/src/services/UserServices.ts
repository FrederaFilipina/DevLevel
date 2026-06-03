
import z, { bigint } from "zod";
import { userRepository,  type UserRepository } from "../repositories/userRepository";
import { getToken } from "../utils/jwt";
import { createHash } from "../utils/createHash";

interface EdicaoServices {

    token: string
    dadosAtualizados:string
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

    async editarEmail({token, dadosAtualizados}: EdicaoServices) {

        const user = getToken(token)

        const editSchema = z.object({
            email: z.email("Email invalido")
        })

        if (!user) {
            throw new Error("Token invalido")
        }

        const validation = editSchema.parse({email:dadosAtualizados})


        return await this.repository.editarEmail({id:user.id,dadosAtualizados})

    }
    async editarSenha({ token, dadosAtualizados }: EdicaoServices) {
         const user = getToken(token)

        const editSchema = z.object({
            senha:z.string().min(6,"Senha precisa ter no mínimo 6 carácteres")
        })

        if (!user) {
            throw new Error("Token invalido")
        }

        const validation = editSchema.parse({senha:dadosAtualizados})

        const hash = await createHash(dadosAtualizados)


        return await this.repository.editarSenha({id:user.id,dadosAtualizados:hash})

        

    }
    async editarNome({ token, dadosAtualizados }: EdicaoServices) {
           const user = getToken(token)

        const editSchema = z.object({
            nome:z.string("Nome invalido")
        })

        if (!user) {
            throw new Error("Token invalido")
        }

        const validation = editSchema.parse({nome:dadosAtualizados})


        return await this.repository.editarNome({id:user.id,dadosAtualizados})


    }
    async editarBio({ token, dadosAtualizados }: EdicaoServices) {
           const user = getToken(token)

        const editSchema = z.object({
            bio:z.string("Bio invalido")
        })

        if (!user) {
            throw new Error("Token invalido")
        }

        const validation = editSchema.parse({bio:dadosAtualizados})


        return await this.repository.editarBio({id:user.id,dadosAtualizados})

    }

    async editar(token: string, data: any) {
        const user = getToken(token)
        if (!user) throw new Error("Token invalido")

        const updateSchema = z.object({
            nome: z.string().optional(),
            email: z.string().email("Email inválido").optional(),
            bio: z.string().optional(),
            avatarUrl: z.string().url("URL de avatar inválida").or(z.string().length(0)).optional(),
            senha: z.string().min(6, "Senha precisa ter no mínimo 6 caracteres").optional()
        })

        const validatedData = updateSchema.parse(data)

        if (validatedData.senha) {
            validatedData.senha = await createHash(validatedData.senha)
        }

        return await this.repository.editar(user.id, validatedData)
    }
}




export const userServices = new UserServices(userRepository)