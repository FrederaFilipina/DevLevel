import { PrismaClient, type Conquista } from "../prisma/generated/prisma";
export class ConquistaRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async listarTodas(): Promise<Conquista[]> {
    return await this.prisma.conquista.findMany({
      orderBy: {
        titulo: "asc",
      },
    });
  }

  async buscarPorId(id: string): Promise<Conquista | null> {
    return await this.prisma.conquista.findUnique({
      where: { id },
    });
  }

  async buscarPorTitulo(titulo: string): Promise<Conquista | null> {
    return await this.prisma.conquista.findUnique({
      where: { titulo },
    });
  }
}