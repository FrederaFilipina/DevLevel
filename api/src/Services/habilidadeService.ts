import { type Habilidade } from "../prisma/generated/prisma";
import { HabilidadeRepository } from "../Repositories/habilidadeRepository";

export class HabilidadeService {
    constructor(
        private readonly habilidadeRepository: HabilidadeRepository
    ) {}

    async listarTodas(): Promise<Habilidade[]> {
        return await this.habilidadeRepository.listarTodas();
    }

    async buscarPorId(id: string): Promise<Habilidade> {
        const habilidade =
            await this.habilidadeRepository.buscarPorId(id);

        if (!habilidade) {
            throw new Error("Habilidade não encontrada.");
        }

        return habilidade;
    }

    async buscarPorNome(nome: string): Promise<Habilidade> {
        const habilidade =
            await this.habilidadeRepository.buscarPorNome(nome);

        if (!habilidade) {
            throw new Error("Habilidade não encontrada.");
        }

        return habilidade;
    }
}