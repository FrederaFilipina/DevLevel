import { PrismaClient, type Ranking } from "../prisma/generated/prisma";

export class RankingRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async buscarPorId(id: string): Promise<Ranking | null> {
        return await this.prisma.ranking.findUnique({
            where: { id },
        });
    }

    async buscarPorUsuarioId(
        usuarioId: string
    ): Promise<Ranking | null> {
        return await this.prisma.ranking.findUnique({
            where: { usuarioId },
        });
    }

    async buscarPorPosicao(
        posicao: number
    ): Promise<Ranking | null> {
        return await this.prisma.ranking.findFirst({
            where: { posicao },
        });
    }

    async listarRankingGeral(): Promise<Ranking[]> {
        return await this.prisma.ranking.findMany({
            orderBy: {
                posicao: "asc",
            },
        });
    }

    async listarTopRanking(
        limite: number = 10
    ): Promise<Ranking[]> {
        return await this.prisma.ranking.findMany({
            orderBy: {
                posicao: "asc",
            },
            take: limite,
        });
    }
}