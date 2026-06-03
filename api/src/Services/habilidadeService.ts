import { type Habilidade } from "../prisma/generated/client";
import { HabilidadeRepository } from "../repositories/habilidadeRepository";

export class HabilidadeService {
  constructor(
    private readonly habilidadeRepository: HabilidadeRepository
  ) {}

  async listarTodas(): Promise<Habilidade[]> {
    return await this.habilidadeRepository.listarTodas();
  }

  async buscarPorId(id: number): Promise<Habilidade> {
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