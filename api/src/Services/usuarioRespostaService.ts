import { type RespostaUsuario } from "../prisma/generated/prisma";
import type { RespostaUsuarioRepository } from "../Repositories/usuarioRespostaRepository";


export class RespostaUsuarioService {
    constructor(
        private readonly respostaUsuarioRepository: RespostaUsuarioRepository
    ) {}

    async buscarPorId(id: string): Promise<RespostaUsuario> {
        const respostaUsuario =
            await this.respostaUsuarioRepository.buscarPorId(id);

        if (!respostaUsuario) {
            throw new Error("Resposta do usuário não encontrada.");
        }

        return respostaUsuario;
    }

    async buscarPorUsuarioEQuestao(
        usuarioId: string,
        questaoId: string
    ): Promise<RespostaUsuario> {
        const respostaUsuario =
            await this.respostaUsuarioRepository.buscarPorUsuarioEQuestao(
                usuarioId,
                questaoId
            );

        if (!respostaUsuario) {
            throw new Error("Resposta do usuário não encontrada.");
        }

        return respostaUsuario;
    }

    async listarPorUsuario(
        usuarioId: string
    ): Promise<RespostaUsuario[]> {
        return await this.respostaUsuarioRepository.listarPorUsuario(
            usuarioId
        );
    }

    async listarPorQuestao(
        questaoId: string
    ): Promise<RespostaUsuario[]> {
        return await this.respostaUsuarioRepository.listarPorQuestao(
            questaoId
        );
    }

    async listarPorRespostaQuestao(
        respostaQuestaoId: string
    ): Promise<RespostaUsuario[]> {
        return await this.respostaUsuarioRepository.listarPorRespostaQuestao(
            respostaQuestaoId
        );
    }
}