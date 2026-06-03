import { type TrilhaUsuario, type StatusTrilhaUsuario} from "../prisma/generated/client";
import type { TrilhaUsuarioRepository } from "../repositories/usuarioTrilhaRepository";


export class TrilhaUsuarioService {
    constructor(
        private readonly trilhaUsuarioRepository: TrilhaUsuarioRepository
    ) {}

    async buscarPorId(id: number): Promise<TrilhaUsuario> {
        const trilhaUsuario =
            await this.trilhaUsuarioRepository.buscarPorId(id);

        if (!trilhaUsuario) {
            throw new Error("Progresso da trilha não encontrado.");
        }

        return trilhaUsuario;
    }

    async buscarPorUsuarioETrilha(
        usuarioId: number,
        trilhaId: number
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
        usuarioId: number
    ): Promise<TrilhaUsuario[]> {
        return await this.trilhaUsuarioRepository.listarPorUsuario(
            usuarioId
        );
    }

    async listarPorTrilha(
        trilhaId: number
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