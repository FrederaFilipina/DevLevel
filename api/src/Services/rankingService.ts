import { type Ranking } from "../prisma/generated/prisma";
import { RankingRepository } from "../Repositories/rankingRepository";

export class RankingService {
    constructor(
        private readonly rankingRepository: RankingRepository
    ) {}

    async buscarPorId(id: string): Promise<Ranking> {
        const ranking =
            await this.rankingRepository.buscarPorId(id);

        if (!ranking) {
            throw new Error("Registro de ranking não encontrado.");
        }

        return ranking;
    }

    async buscarPorUsuarioId(
        usuarioId: string
    ): Promise<Ranking> {
        const ranking =
            await this.rankingRepository.buscarPorUsuarioId(
                usuarioId
            );

        if (!ranking) {
            throw new Error("Ranking do usuário não encontrado.");
        }

        return ranking;
    }

    async buscarPorPosicao(
        posicao: number
    ): Promise<Ranking> {
        const ranking =
            await this.rankingRepository.buscarPorPosicao(
                posicao
            );

        if (!ranking) {
            throw new Error("Posição de ranking não encontrada.");
        }

        return ranking;
    }

    async listarRankingGeral(): Promise<Ranking[]> {
        return await this.rankingRepository.listarRankingGeral();
    }

    async listarTopRanking(
        limite: number = 10
    ): Promise<Ranking[]> {
        return await this.rankingRepository.listarTopRanking(
            limite
        );
    }
}