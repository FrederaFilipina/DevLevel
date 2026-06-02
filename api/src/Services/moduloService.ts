import { type Modulo } from "../prisma/generated/prisma";
import { ModuloRepository } from "../Repositories/moduloRepository";

export class ModuloService {
  constructor(
    private readonly moduloRepository: ModuloRepository
  ) {}

  async listarTodos(): Promise<Modulo[]> {
    return await this.moduloRepository.listarTodos();
  }

  async buscarPorId(id: number): Promise<Modulo> {
    const modulo =
      await this.moduloRepository.buscarPorId(id);

    if (!modulo) {
      throw new Error("Módulo não encontrado.");
    }

    return modulo;
  }

  async listarPorTrilha(
    trilhaId: number
  ): Promise<Modulo[]> {
    return await this.moduloRepository.listarPorTrilha(
      trilhaId
    );
  }

  async buscarPorTrilhaEOrdem(
    trilhaId: number,
    ordem: number
  ): Promise<Modulo> {
    const modulo =
      await this.moduloRepository.buscarPorTrilhaEOrdem(
        trilhaId,
        ordem
      );

    if (!modulo) {
      throw new Error("Módulo não encontrado.");
    }

    return modulo;
  }
}