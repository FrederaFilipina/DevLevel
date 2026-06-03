import z from "zod";
import type { Conquista } from "../prisma/generated/client";
import { conquistaRepository, ConquistaRepository } from "../repositories/conquistaRepository";

export class ConquistaService {
  constructor(private readonly repository: ConquistaRepository) {}

  async listarTodas(): Promise<Conquista[]> {
    try {
      return await this.repository.listarTodas();
    } catch (error) {
      console.error("Erro no service ao listar conquistas:", error);
      throw new Error("Não foi possível listar as conquistas.");
    }
  }

  async buscarPorId(id: number): Promise<Conquista | null> {
    const schema = z.number().int().positive("ID inválido");
    const idValidated = schema.parse(id);

    try {
      return await this.repository.buscarPorId(idValidated);
    } catch (error) {
      console.error("Erro no service ao buscar conquista por ID:", error);
      throw new Error("Não foi possível buscar a conquista.");
    }
  }

  async buscarPorTitulo(titulo: string): Promise<Conquista | null> {
    const schema = z.string().min(1, "Título inválido");
    const tituloValidated = schema.parse(titulo);

    try {
      return await this.repository.buscarPorTitulo(tituloValidated);
    } catch (error) {
      console.error("Erro no service ao buscar conquista por título:", error);
      throw new Error("Não foi possível buscar a conquista.");
    }
  }

  async listarOrdenadasPorXp(): Promise<Conquista[]> {
    try {
      return await this.repository.listarOrdenadasPorXp();
    } catch (error) {
      console.error("Erro no service ao listar conquistas por XP:", error);
      throw new Error("Não foi possível listar as conquistas por XP.");
    }
  }
}

export const conquistaService = new ConquistaService(conquistaRepository);