import { type Tema } from "../prisma/generated/prisma";
import type { TemaRepository } from "../Repositories/temaRepository";


export class TemaService {
  constructor(
    private readonly temaRepository: TemaRepository
  ) {}

  async listarTodos(): Promise<Tema[]> {
    return await this.temaRepository.listarTodos();
  }

  async buscarPorId(id: string): Promise<Tema> {
    const tema = await this.temaRepository.buscarPorId(id);

    if (!tema) {
      throw new Error("Tema não encontrado.");
    }

    return tema;
  }

  async buscarPorNome(nome: string): Promise<Tema> {
    const tema = await this.temaRepository.buscarPorNome(nome);

    if (!tema) {
      throw new Error("Tema não encontrado.");
    }

    return tema;
  }
}