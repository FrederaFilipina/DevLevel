import { type RespostaUsuario } from "../prisma/generated/prisma";
import type { RespostaUsuarioRepository } from "../Repositories/usuarioRespostaRepository";


export class RespostaUsuarioService {
    constructor(
        private readonly respostaUsuarioRepository: RespostaUsuarioRepository
    ) {}

    async buscarPorId(id: number): Promise<RespostaUsuario> {
        const respostaUsuario =
            await this.respostaUsuarioRepository.buscarPorId(id);

        if (!respostaUsuario) {
            throw new Error("Resposta do usuário não encontrada.");
        }

        return respostaUsuario;
    }

    async buscarPorUsuarioEQuestao(
        usuarioId: number,
        questaoId: number
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
        usuarioId: number
    ): Promise<RespostaUsuario[]> {
        return await this.respostaUsuarioRepository.listarPorUsuario(
            usuarioId
        );
    }

    async listarPorQuestao(
        questaoId: number
    ): Promise<RespostaUsuario[]> {
        return await this.respostaUsuarioRepository.listarPorQuestao(
            questaoId
        );
    }

    async listarPorRespostaQuestao(
        respostaQuestaoId: number
    ): Promise<RespostaUsuario[]> {
        return await this.respostaUsuarioRepository.listarPorRespostaQuestao(
            respostaQuestaoId
        );
    }
}