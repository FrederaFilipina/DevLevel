import z from "zod";
import type { Habilidade } from "../prisma/generated/client";
import {
  habilidadeRepository,
  HabilidadeRepository,
} from "../repositories/habilidadeRepository";

export class HabilidadeService {
  constructor(private readonly repository: HabilidadeRepository) {}

  async listarTodas(): Promise<Habilidade[]> {
    try {
      return await this.repository.listarTodas();
    } catch (error) {
      console.error("Erro no service ao listar habilidades:", error);
      throw new Error("Não foi possível listar as habilidades.");
    }
  }

  async buscarPorId(id: number): Promise<Habilidade | null> {
    const schema = z.number().int().positive("ID inválido");
    const idValidated = schema.parse(id);

    try {
      return await this.repository.buscarPorId(idValidated);
    } catch (error) {
      console.error("Erro no service ao buscar habilidade por ID:", error);
      throw new Error("Não foi possível buscar a habilidade.");
    }
  }

  async buscarPorNome(nome: string): Promise<Habilidade | null> {
    const schema = z.string().min(1, "Nome inválido");
    const nomeValidated = schema.parse(nome);

    try {
      return await this.repository.buscarPorNome(nomeValidated);
    } catch (error) {
      console.error("Erro no service ao buscar habilidade por nome:", error);
      throw new Error("Não foi possível buscar a habilidade.");
    }
  }
}

export const habilidadeService = new HabilidadeService(habilidadeRepository);