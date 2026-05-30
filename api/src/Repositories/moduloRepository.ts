import { PrismaClient, type Modulo } from "../prisma/generated/prisma";

export class ModuloRepository {
    constructor(private prisma: PrismaClient) { }

    async listarTodos(): Promise<Modulo[]> {
        return await this.prisma.modulo.findMany({
            orderBy: [
                { trilhaId: "asc" },
                { ordem: "asc" },
            ],
        });
    }

    async buscarPorId(id: string): Promise<Modulo | null> {
        return await this.prisma.modulo.findUnique({
            where: { id },
        });
    }

    async listarPorTrilha(trilhaId: string): Promise<Modulo[]> {
        return await this.prisma.modulo.findMany({
            where: { trilhaId },
            orderBy: {
                ordem: "asc",
            },
        });
    }

    async buscarPorTrilhaEOrdem(
        trilhaId: string,
        ordem: number
    ): Promise<Modulo | null> {
        return await this.prisma.modulo.findUnique({
            where: {
                trilhaId_ordem: {
                    trilhaId,
                    ordem,
                },
            },
        });
    }
}