import z from "zod";
import type { Trilha } from "../prisma/generated/client";
import {
  trilhaRepository,
  TrilhaRepository,
} from "../repositories/trilhaRepository";

export class TrilhaService {
  constructor(private readonly repository: TrilhaRepository) {}

  async listarTodas(): Promise<Trilha[]> {
    try {
      return await this.repository.listarTodas();
    } catch (error) {
      console.error("Erro no service ao listar trilhas:", error);
      throw new Error("Não foi possível listar as trilhas.");
    }
  }

  async buscarPorId(id: number): Promise<Trilha | null> {
    const schema = z.number().int().positive("ID inválido");
    const idValidated = schema.parse(id);

    try {
      return await this.repository.buscarPorId(idValidated);
    } catch (error) {
      console.error("Erro no service ao buscar trilha por ID:", error);
      throw new Error("Não foi possível buscar a trilha.");
    }
  }

  async listarPorTema(temaId: number): Promise<Trilha[]> {
    const schema = z.number().int().positive("TemaId inválido");
    const temaIdValidated = schema.parse(temaId);

    try {
      return await this.repository.listarPorTema(temaIdValidated);
    } catch (error) {
      console.error("Erro no service ao listar trilhas por tema:", error);
      throw new Error("Não foi possível listar as trilhas do tema.");
    }
  }

  async buscarPorTemaEOrdem(
    temaId: number,
    ordem: number
  ): Promise<Trilha | null> {
    const schema = z.object({
      temaId: z.number().int().positive("TemaId inválido"),
      ordem: z.number().int().nonnegative("Ordem inválida"),
    });

    const validated = schema.parse({ temaId, ordem });

    try {
      return await this.repository.buscarPorTemaEOrdem(
        validated.temaId,
        validated.ordem
      );
    } catch (error) {
      console.error("Erro no service ao buscar trilha por tema e ordem:", error);
      throw new Error("Não foi possível buscar a trilha.");
    }
  }

  // =========================
  // NOVO: regra de leitura de trilha com progressão
  // =========================
  async buscarComDependencias(id: number): Promise<Trilha | null> {
    const schema = z.number().int().positive("ID inválido");
    const idValidated = schema.parse(id);

    try {
      return await this.repository.buscarComDependencias(idValidated);
    } catch (error) {
      console.error("Erro no service ao buscar trilha com dependências:", error);
      throw new Error("Não foi possível buscar a trilha com dependências.");
    }
  }

  // =========================
  // NOVO: trilhas com regras de progressão
  // =========================
  async listarComRegrasPorTema(temaId: number): Promise<Trilha[]> {
    const schema = z.number().int().positive("TemaId inválido");
    const temaIdValidated = schema.parse(temaId);

    try {
      return await this.repository.listarComRegrasPorTema(temaIdValidated);
    } catch (error) {
      console.error("Erro no service ao listar trilhas com regras:", error);
      throw new Error("Não foi possível listar trilhas com regras.");
    }
  }

  // =========================
  // NOVO: validação de acesso (regra de negócio leve)
  // =========================
  async validarAcessoTrilha(trilha: Trilha): Promise<boolean> {
    try {
      // LIVRE → sempre acessível
      if (trilha.tipoDesbloqueio === "LIVRE") return true;

      // SEQUENCIAL → depende da anterior
      if (trilha.tipoDesbloqueio === "SEQUENCIAL") {
        return !!trilha.trilhaAnteriorId;
      }

      return false;
    } catch (error) {
      console.error("Erro ao validar acesso da trilha:", error);
      throw new Error("Não foi possível validar acesso à trilha.");
    }
  }
}

export const trilhaService = new TrilhaService(trilhaRepository);