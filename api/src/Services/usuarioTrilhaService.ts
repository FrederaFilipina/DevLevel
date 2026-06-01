import { type TrilhaUsuario, type StatusTrilhaUsuario} from "../prisma/generated/prisma";
import type { TrilhaUsuarioRepository } from "../Repositories/usuarioTrilhaRepository";


export class TrilhaUsuarioService {
    constructor(
        private readonly trilhaUsuarioRepository: TrilhaUsuarioRepository
    ) {}

    async buscarPorId(id: string): Promise<TrilhaUsuario> {
        const trilhaUsuario =
            await this.trilhaUsuarioRepository.buscarPorId(id);

        if (!trilhaUsuario) {
            throw new Error("Progresso da trilha não encontrado.");
        }

        return trilhaUsuario;
    }

    async buscarPorUsuarioETrilha(
        usuarioId: string,
        trilhaId: string
    ): Promise<TrilhaUsuario> {
        const trilhaUsuario =
            await this.trilhaUsuarioRepository.buscarPorUsuarioETrilha(
                usuarioId,
                trilhaId
            );

        if (!trilhaUsuario) {
            throw new Error("Progresso da trilha não encontrado.");
        }

        return trilhaUsuario;
    }

    async listarPorUsuario(
        usuarioId: string
    ): Promise<TrilhaUsuario[]> {
        return await this.trilhaUsuarioRepository.listarPorUsuario(
            usuarioId
        );
    }

    async listarPorTrilha(
        trilhaId: string
    ): Promise<TrilhaUsuario[]> {
        return await this.trilhaUsuarioRepository.listarPorTrilha(
            trilhaId
        );
    }

    async listarPorStatus(
        status: StatusTrilhaUsuario
    ): Promise<TrilhaUsuario[]> {
        return await this.trilhaUsuarioRepository.listarPorStatus(
            status
        );
    }
}