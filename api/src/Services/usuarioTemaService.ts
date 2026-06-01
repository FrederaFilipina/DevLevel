import { type TemaUsuario, type NivelDificuldade } from "../prisma/generated/prisma";
import type { TemaUsuarioRepository } from "../Repositories/usuarioTemaRepository";

export class TemaUsuarioService {
    constructor(
        private readonly temaUsuarioRepository: TemaUsuarioRepository
    ) {}

    async buscarPorId(id: string): Promise<TemaUsuario> {
        const temaUsuario =
            await this.temaUsuarioRepository.buscarPorId(id);

        if (!temaUsuario) {
            throw new Error("Progresso do tema não encontrado.");
        }

        return temaUsuario;
    }

    async buscarPorUsuarioETema(
        usuarioId: string,
        temaId: string
    ): Promise<TemaUsuario> {
        const temaUsuario =
            await this.temaUsuarioRepository.buscarPorUsuarioETema(
                usuarioId,
                temaId
            );

        if (!temaUsuario) {
            throw new Error("Progresso do tema não encontrado.");
        }

        return temaUsuario;
    }

    async listarPorUsuario(
        usuarioId: string
    ): Promise<TemaUsuario[]> {
        return await this.temaUsuarioRepository.listarPorUsuario(
            usuarioId
        );
    }

    async listarPorTema(
        temaId: string
    ): Promise<TemaUsuario[]> {
        return await this.temaUsuarioRepository.listarPorTema(
            temaId
        );
    }

    async listarPorNivel(
        nivel: NivelDificuldade
    ): Promise<TemaUsuario[]> {
        return await this.temaUsuarioRepository.listarPorNivel(
            nivel
        );
    }
}