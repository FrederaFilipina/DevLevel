import { type RespostaQuestao } from "../prisma/generated/prisma";
import type { RespostaQuestaoRepository } from "../Repositories/questaoRespostaRepository";


export class RespostaQuestaoService {
    constructor(
        private readonly respostaQuestaoRepository: RespostaQuestaoRepository
    ) {}

    async buscarPorId(id: string): Promise<RespostaQuestao> {
        const respostaQuestao =
            await this.respostaQuestaoRepository.buscarPorId(id);

        if (!respostaQuestao) {
            throw new Error("Resposta da questão não encontrada.");
        }

        return respostaQuestao;
    }

    async listarPorQuestao(
        questaoId: string
    ): Promise<RespostaQuestao[]> {
        return await this.respostaQuestaoRepository.listarPorQuestao(
            questaoId
        );
    }

    async buscarPorQuestaoETitulo(
        questaoId: string,
        titulo: string
    ): Promise<RespostaQuestao> {
        const respostaQuestao =
            await this.respostaQuestaoRepository.buscarPorQuestaoETitulo(
                questaoId,
                titulo
            );

        if (!respostaQuestao) {
            throw new Error("Resposta da questão não encontrada.");
        }

        return respostaQuestao;
    }

    async listarMelhoresRespostas(
        questaoId: string
    ): Promise<RespostaQuestao[]> {
        return await this.respostaQuestaoRepository.listarMelhoresRespostas(
            questaoId
        );
    }

    async listarPorPerformance(
        questaoId: string
    ): Promise<RespostaQuestao[]> {
        return await this.respostaQuestaoRepository.listarPorPerformance(
            questaoId
        );
    }

    async listarPorCleanCode(
        questaoId: string
    ): Promise<RespostaQuestao[]> {
        return await this.respostaQuestaoRepository.listarPorCleanCode(
            questaoId
        );
    }
}