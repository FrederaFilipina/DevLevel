import { type ConquistaUsuario } from "../prisma/generated/prisma";
import { ConquistaUsuarioRepository } from "../Repositories/usuarioConquistaRepository";

export class ConquistaUsuarioService {
    constructor(
        private readonly conquistaUsuarioRepository: ConquistaUsuarioRepository
    ) {}

    async buscarPorId(id: string): Promise<ConquistaUsuario> {
        const conquistaUsuario =
            await this.conquistaUsuarioRepository.buscarPorId(id);

        if (!conquistaUsuario) {
            throw new Error("Conquista do usuário não encontrada.");
        }

        return conquistaUsuario;
    }

    async buscarPorUsuarioEConquista(
        usuarioId: string,
        conquistaId: string
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
        usuarioId: string
    ): Promise<ConquistaUsuario[]> {
        return await this.conquistaUsuarioRepository.listarPorUsuario(
            usuarioId
        );
    }

    async listarPorConquista(
        conquistaId: string
    ): Promise<ConquistaUsuario[]> {
        return await this.conquistaUsuarioRepository.listarPorConquista(
            conquistaId
        );
    }

    async listarTodos(): Promise<ConquistaUsuario[]> {
        return await this.conquistaUsuarioRepository.listarTodos();
    }
}