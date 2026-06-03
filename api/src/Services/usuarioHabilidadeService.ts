import { type HabilidadeUsuario } from "../prisma/generated/prisma/client";
import type { HabilidadeUsuarioRepository } from "../Repositories/usuarioHabilidadeRepository";


export class HabilidadeUsuarioService {
    constructor(
        private readonly habilidadeUsuarioRepository: HabilidadeUsuarioRepository
    ) {}

    async buscarPorId(id: number): Promise<HabilidadeUsuario> {
        const habilidadeUsuario =
            await this.habilidadeUsuarioRepository.buscarPorId(id);

        if (!habilidadeUsuario) {
            throw new Error("Habilidade do usuário não encontrada.");
        }

        return habilidadeUsuario;
    }

    async buscarPorUsuarioEHabilidade(
        usuarioId: number,
        habilidadeId: number
    ): Promise<HabilidadeUsuario> {
        const habilidadeUsuario =
            await this.habilidadeUsuarioRepository.buscarPorUsuarioEHabilidade(
                usuarioId,
                habilidadeId
            );

        if (!habilidadeUsuario) {
            throw new Error("Habilidade do usuário não encontrada.");
        }

        return habilidadeUsuario;
    }

    async listarPorUsuario(
        usuarioId: number
    ): Promise<HabilidadeUsuario[]> {
        return await this.habilidadeUsuarioRepository.listarPorUsuario(
            usuarioId
        );
    }

    async listarPorHabilidade(
        habilidadeId: number
    ): Promise<HabilidadeUsuario[]> {
        return await this.habilidadeUsuarioRepository.listarPorHabilidade(
            habilidadeId
        );
    }

    async listarPorNivel(
        nivel: number
    ): Promise<HabilidadeUsuario[]> {
        return await this.habilidadeUsuarioRepository.listarPorNivel(
            nivel
        );
    }
}