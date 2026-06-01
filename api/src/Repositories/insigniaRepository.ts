import { PrismaClient, type Insignia, type TipoInsignia, } from "../prisma/generated/prisma";

export class InsigniaRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async listarTodas(): Promise<Insignia[]> {
    return await this.prisma.insignia.findMany({
      orderBy: {
        titulo: "asc",
      },
    });
  }

  async buscarPorId(id: string): Promise<Insignia | null> {
    return await this.prisma.insignia.findUnique({
      where: { id },
    });
  }

  async buscarPorTitulo(titulo: string): Promise<Insignia | null> {
    return await this.prisma.insignia.findUnique({
      where: { titulo },
    });
  }

  async listarPorTipo(
    tipo: TipoInsignia
  ): Promise<Insignia[]> {
    return await this.prisma.insignia.findMany({
      where: { tipo },
      orderBy: {
        titulo: "asc",
      },
    });
  }
}