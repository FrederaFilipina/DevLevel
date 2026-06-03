import z from "zod";
import type { Tema } from "../prisma/generated/client";
import { temaRepository, TemaRepository } from "../repositories/temaRepository";

export class TemaService {
  constructor(private readonly repository: TemaRepository) {}

  async listarTodos(): Promise<Tema[]> {
    try {
      return await this.repository.listarTodos();
    } catch (error) {
      console.error("Erro no service ao listar temas:", error);
      throw new Error("Não foi possível listar os temas.");
    }
  }

  async buscarPorId(id: number): Promise<Tema | null> {
    const schema = z.number().int().positive("ID inválido");
    const idValidated = schema.parse(id);

    try {
      return await this.repository.buscarPorId(idValidated);
    } catch (error) {
      console.error("Erro no service ao buscar tema por ID:", error);
      throw new Error("Não foi possível buscar o tema.");
    }
  }

  async buscarPorNome(nome: string): Promise<Tema | null> {
    const schema = z.string().min(1, "Nome inválido");
    const nomeValidated = schema.parse(nome);

    try {
      return await this.repository.buscarPorNome(nomeValidated);
    } catch (error) {
      console.error("Erro no service ao buscar tema por nome:", error);
      throw new Error("Não foi possível buscar o tema.");
    }
  }
}

export const temaService = new TemaService(temaRepository);