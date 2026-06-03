import { type Conquista } from "../prisma/generated/prisma/client";
import { ConquistaRepository } from "../Repositories/conquistaRepository";

export class ConquistaService {
  constructor(
    private readonly conquistaRepository: ConquistaRepository
  ) {}

  async listarTodas(): Promise<Conquista[]> {
    return await this.conquistaRepository.listarTodas();
  }

  async buscarPorId(id: number): Promise<Conquista> {
    const conquista =
      await this.conquistaRepository.buscarPorId(id);

    if (!conquista) {
      throw new Error("Conquista não encontrada.");
    }

    return conquista;
  }

  async buscarPorTitulo(
    titulo: string
  ): Promise<Conquista> {
    const conquista =
      await this.conquistaRepository.buscarPorTitulo(
        titulo
      );

    if (!conquista) {
      throw new Error("Conquista não encontrada.");
    }

    return conquista;
  }
}