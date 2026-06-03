import z from "zod";
import type { RespostaUsuario } from "../prisma/generated/client";
import {
  usuarioRespostaRepository,
  UsuarioRespostaRepository,
} from "../repositories/usuarioRespostaRepository";

export class UsuarioRespostaService {
  constructor(private readonly repository: UsuarioRespostaRepository) {}

  // =========================
  // LEITURA
  // =========================

  async listarTodos(): Promise<RespostaUsuario[]> {
    try {
      return await this.repository.listarTodos();
    } catch (error) {
      console.error("Erro no service ao listar respostas do usuário:", error);
      throw new Error("Não foi possível listar as respostas do usuário.");
    }
  }

  async buscarPorId(id: number): Promise<RespostaUsuario | null> {
    const schema = z.number().int().positive("ID inválido");
    const idValidated = schema.parse(id);

    try {
      return await this.repository.buscarPorId(idValidated);
    } catch (error) {
      console.error(
        "Erro no service ao buscar resposta do usuário por ID:",
        error
      );
      throw new Error("Não foi possível buscar o registro.");
    }
  }

  async buscarPorUsuarioEQuestao(
    usuarioId: number,
    questaoId: number
  ): Promise<RespostaUsuario | null> {
    const schema = z.object({
      usuarioId: z.number().int().positive("UsuarioId inválido"),
      questaoId: z.number().int().positive("QuestaoId inválido"),
    });

    const validated = schema.parse({ usuarioId, questaoId });

    try {
      return await this.repository.buscarPorUsuarioEQuestao(
        validated.usuarioId,
        validated.questaoId
      );
    } catch (error) {
      console.error(
        "Erro no service ao buscar resposta do usuário (composta):",
        error
      );
      throw new Error("Não foi possível buscar o registro.");
    }
  }

  // =========================
  // REGISTRO / UPSERT
  // =========================

  async registrarResposta(data: {
    usuarioId: number;
    questaoId: number;
    respostaQuestaoId: number;
    pontuacaoRecebida: number;
  }): Promise<RespostaUsuario> {
    const schema = z.object({
      usuarioId: z.number().int().positive("UsuarioId inválido"),
      questaoId: z.number().int().positive("QuestaoId inválido"),
      respostaQuestaoId: z.number().int().positive(
        "RespostaQuestaoId inválido"
      ),
      pontuacaoRecebida: z.number().nonnegative(
        "Pontuação não pode ser negativa"
      ),
    });

    const validated = schema.parse(data);

    try {
      return await this.repository.registrarResposta(validated);
    } catch (error) {
      console.error("Erro no service ao registrar resposta:", error);
      throw new Error("Não foi possível registrar a resposta.");
    }
  }

  async atualizarPontuacao(
    usuarioId: number,
    questaoId: number,
    pontuacao: number
  ): Promise<RespostaUsuario> {
    const schema = z.object({
      usuarioId: z.number().int().positive("UsuarioId inválido"),
      questaoId: z.number().int().positive("QuestaoId inválido"),
      pontuacao: z.number().nonnegative("Pontuação inválida"),
    });

    const validated = schema.parse({ usuarioId, questaoId, pontuacao });

    try {
      return await this.repository.atualizarPontuacao(
        validated.usuarioId,
        validated.questaoId,
        validated.pontuacao
      );
    } catch (error) {
      console.error(
        "Erro no service ao atualizar pontuação da resposta:",
        error
      );
      throw new Error("Não foi possível atualizar a pontuação.");
    }
  }
}

export const usuarioRespostaService = new UsuarioRespostaService(
  usuarioRespostaRepository
);