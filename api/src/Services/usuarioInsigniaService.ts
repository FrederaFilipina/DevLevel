import { type InsigniaUsuario } from "../prisma/generated/prisma";
import type { InsigniaUsuarioRepository } from "../Repositories/usuarioInsigniaRepository";


export class InsigniaUsuarioService {
    constructor(
        private readonly insigniaUsuarioRepository: InsigniaUsuarioRepository
    ) {}

    async buscarPorId(id: string): Promise<InsigniaUsuario> {
        const insigniaUsuario =
            await this.insigniaUsuarioRepository.buscarPorId(id);

        if (!insigniaUsuario) {
            throw new Error("Insígnia do usuário não encontrada.");
        }

        return insigniaUsuario;
    }

    async buscarPorUsuarioEInsignia(
        usuarioId: string,
        insigniaId: string
    ): Promise<InsigniaUsuario> {
        const insigniaUsuario =
            await this.insigniaUsuarioRepository.buscarPorUsuarioEInsignia(
                usuarioId,
                insigniaId
            );

        if (!insigniaUsuario) {
            throw new Error("Insígnia do usuário não encontrada.");
        }

        return insigniaUsuario;
    }

    async listarPorUsuario(
        usuarioId: string
    ): Promise<InsigniaUsuario[]> {
        return await this.insigniaUsuarioRepository.listarPorUsuario(
            usuarioId
        );
    }

    async listarPorInsignia(
        insigniaId: string
    ): Promise<InsigniaUsuario[]> {
        return await this.insigniaUsuarioRepository.listarPorInsignia(
            insigniaId
        );
    }

    async listarPorTema(
        temaId: string
    ): Promise<InsigniaUsuario[]> {
        return await this.insigniaUsuarioRepository.listarPorTema(
            temaId
        );
    }

    async listarPorTrilha(
        trilhaId: string
    ): Promise<InsigniaUsuario[]> {
        return await this.insigniaUsuarioRepository.listarPorTrilha(
            trilhaId
        );
    }

    async listarTodos(): Promise<InsigniaUsuario[]> {
        return await this.insigniaUsuarioRepository.listarTodos();
    }
}