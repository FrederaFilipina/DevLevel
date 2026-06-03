import { type Trilha } from "../prisma/generated/prisma/client";
import { TrilhaRepository } from "../Repositories/trilhaRepository";

export class TrilhaService {
  constructor(
    private readonly trilhaRepository: TrilhaRepository
  ) {}

  async listarTodas(): Promise<Trilha[]> {
    return await this.trilhaRepository.listarTodas();
  }

  async buscarPorId(id: number): Promise<Trilha> {
    const trilha =
      await this.trilhaRepository.buscarPorId(id);

    if (!trilha) {
      throw new Error("Trilha não encontrada.");
    }

    return trilha;
  }

  async listarPorTema(
    temaId: number
  ): Promise<Trilha[]> {
    return await this.trilhaRepository.listarPorTema(
      temaId
    );
  }

  async buscarPorTemaEOrdem(
    temaId: number,
    ordem: number
  ): Promise<Trilha> {
    const trilha =
      await this.trilhaRepository.buscarPorTemaEOrdem(
        temaId,
        ordem
      );

    if (!trilha) {
      throw new Error("Trilha não encontrada.");
    }

    return trilha;
  }

  async buscarTrilhaAnterior(
    id: number
  ): Promise<Trilha> {
    const trilhaAnterior =
      await this.trilhaRepository.buscarTrilhaAnterior(
        id
      );

    if (!trilhaAnterior) {
      throw new Error("Trilha anterior não encontrada.");
    }

    return trilhaAnterior;
  }

  async buscarProximasTrilhas(
    id: number
  ): Promise<Trilha[]> {
    return await this.trilhaRepository.buscarProximasTrilhas(
      id
    );
  }
}