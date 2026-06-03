import { type Questao } from "../prisma/generated/prisma/client";
import { QuestaoRepository } from "../Repositories/questaoRepository";

export class QuestaoService {
  constructor(
    private readonly questaoRepository: QuestaoRepository
  ) {}

  async listarTodas(): Promise<Questao[]> {
    return await this.questaoRepository.listarTodas();
  }

  async buscarPorId(id: number): Promise<Questao> {
    const questao =
      await this.questaoRepository.buscarPorId(id);

    if (!questao) {
      throw new Error("Questão não encontrada.");
    }

    return questao;
  }

  async listarPorModulo(
    moduloId: number
  ): Promise<Questao[]> {
    return await this.questaoRepository.listarPorModulo(
      moduloId
    );
  }

  async buscarPorModuloEOrdem(
    moduloId: number,
    ordem: number
  ): Promise<Questao> {
    const questao =
      await this.questaoRepository.buscarPorModuloEOrdem(
        moduloId,
        ordem
      );

    if (!questao) {
      throw new Error("Questão não encontrada.");
    }

    return questao;
  }

  async listarPorDificuldade(
    dificuldade: number
  ): Promise<Questao[]> {
    return await this.questaoRepository.listarPorDificuldade(
      dificuldade
    );
  }
}