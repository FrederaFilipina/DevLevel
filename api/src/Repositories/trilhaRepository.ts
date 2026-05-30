import type { PrismaClient, Trilha } from "../prisma/generated/prisma";


export class TrilhaRepository {
    constructor(private prisma: PrismaClient) { }

    async listarTodas(): Promise<Trilha[]> {
        return await this.prisma.trilha.findMany({
            orderBy: [
                { temaId: "asc" },
                { ordem: "asc" },
            ],
        });
    }

    async buscarPorId(id: string): Promise<Trilha | null> {
        return await this.prisma.trilha.findUnique({
            where: { id },
        });
    }

    async listarPorTema(temaId: string): Promise<Trilha[]> {
        return await this.prisma.trilha.findMany({
            where: { temaId },
            orderBy: {
                ordem: "asc",
            },
        });
    }

    async buscarPorTemaEOrdem(
        temaId: string,
        ordem: number
    ): Promise<Trilha | null> {
        return await this.prisma.trilha.findUnique({
            where: {
                temaId_ordem: {
                    temaId,
                    ordem,
                },
            },
        });
    }

    async buscarTrilhaAnterior(id: string): Promise<Trilha | null> {
        const trilha = await this.prisma.trilha.findUnique({
            where: { id },
            include: {
                trilhaAnterior: true,
            },
        });

        return trilha?.trilhaAnterior ?? null;
    }

    async buscarProximasTrilhas(id: string): Promise<Trilha[]> {
        const trilha = await this.prisma.trilha.findUnique({
            where: { id },
            include: {
                proximasTrilhas: true,
            },
        });

        return trilha?.proximasTrilhas ?? [];
    }
}