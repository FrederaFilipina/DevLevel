import { type ConquistaUsuario } from "../prisma/generated/client";
import { ConquistaUsuarioRepository } from "../Repositories/usuarioConquistaRepository";

export class ConquistaUsuarioService {
    constructor(
        private readonly conquistaUsuarioRepository: ConquistaUsuarioRepository
    ) {}

    async buscarPorId(id: number): Promise<ConquistaUsuario> {
        const conquistaUsuario =
            await this.conquistaUsuarioRepository.buscarPorId(id);

        if (!conquistaUsuario) {
            throw new Error("Conquista do usuário não encontrada.");
        }

        return conquistaUsuario;
    }

    async buscarPorUsuarioEConquista(
        usuarioId: number,
        conquistaId: number
    ): Promise<ConquistaUsuario> {
        const conquistaUsuario =
            await this.conquistaUsuarioRepository.buscarPorUsuarioEConquista(
                usuarioId,
                conquistaId
            );

        if (!conquistaUsuario) {
            throw new Error("Conquista do usuário não encontrada.");
        }

        return conquistaUsuario;
    }

    async listarPorUsuario(
        usuarioId: number
    ): Promise<ConquistaUsuario[]> {
        return await this.conquistaUsuarioRepository.listarPorUsuario(
            usuarioId
        );
    }

    async listarPorConquista(
        conquistaId: number
    ): Promise<ConquistaUsuario[]> {
        return await this.conquistaUsuarioRepository.listarPorConquista(
            conquistaId
        );
    }

    async listarTodos(): Promise<ConquistaUsuario[]> {
        return await this.conquistaUsuarioRepository.listarTodos();
    }
}