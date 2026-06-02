import { type RespostaQuestao } from "../prisma/generated/prisma";
import type { RespostaQuestaoRepository } from "../Repositories/questaoRespostaRepository";

export class RespostaQuestaoService {
  constructor(
    private readonly respostaQuestaoRepository: RespostaQuestaoRepository
  ) {}

  async buscarPorId(
    id: number
  ): Promise<RespostaQuestao> {
    const respostaQuestao =
      await this.respostaQuestaoRepository.buscarPorId(
        id
      );

    if (!respostaQuestao) {
      throw new Error(
        "Resposta da questão não encontrada."
      );
    }

    return respostaQuestao;
  }

  async listarPorQuestao(
    questaoId: number
  ): Promise<RespostaQuestao[]> {
    return await this.respostaQuestaoRepository.listarPorQuestao(
      questaoId
    );
  }

  async buscarPorQuestaoETitulo(
    questaoId: number,
    titulo: string
  ): Promise<RespostaQuestao> {
    const respostaQuestao =
      await this.respostaQuestaoRepository.buscarPorQuestaoETitulo(
        questaoId,
        titulo
      );

    if (!respostaQuestao) {
      throw new Error(
        "Resposta da questão não encontrada."
      );
    }

    return respostaQuestao;
  }

  async listarMelhoresRespostas(
    questaoId: number
  ): Promise<RespostaQuestao[]> {
    return await this.respostaQuestaoRepository.listarMelhoresRespostas(
      questaoId
    );
  }

  async listarPorPerformance(
    questaoId: number
  ): Promise<RespostaQuestao[]> {
    return await this.respostaQuestaoRepository.listarPorPerformance(
      questaoId
    );
  }

  async listarPorCleanCode(
    questaoId: number
  ): Promise<RespostaQuestao[]> {
    return await this.respostaQuestaoRepository.listarPorCleanCode(
      questaoId
    );
  }
}