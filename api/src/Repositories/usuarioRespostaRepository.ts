import type { PrismaClient, RespostaUsuario } from "../prisma/generated/client";
import { prisma } from "../prisma/prisma";

export class UsuarioRespostaRepository {
  constructor(private readonly prisma: PrismaClient) {
    this.prisma;
  }

  // =========================
  // LEITURA
  // =========================

  async listarTodos(): Promise<RespostaUsuario[]> {
    try {
      return await this.prisma.respostaUsuario.findMany({
        orderBy: {
          id: "asc",
        },
      });
    } catch (error) {
      console.error("Erro ao listar respostas do usuário:", error);
      throw new Error("Não foi possível listar as respostas do usuário.");
    }
  }

  async buscarPorId(id: number): Promise<RespostaUsuario | null> {
    try {
      return await this.prisma.respostaUsuario.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      console.error("Erro ao buscar resposta do usuário por ID:", error);
      throw new Error("Não foi possível buscar o registro.");
    }
  }

  async buscarPorUsuarioEQuestao(
    usuarioId: number,
    questaoId: number
  ): Promise<RespostaUsuario | null> {
    try {
      return await this.prisma.respostaUsuario.findUnique({
        where: {
          usuarioId_questaoId: {
            usuarioId,
            questaoId,
          },
        },
      });
    } catch (error) {
      console.error("Erro ao buscar resposta do usuário composta:", error);
      throw new Error("Não foi possível buscar o registro.");
    }
  }

  // =========================
  // UPDATE / UPSERT DE RESPOSTA
  // =========================

  async registrarResposta(data: {
    usuarioId: number;
    questaoId: number;
    respostaQuestaoId: number;
    pontuacaoRecebida: number;
  }): Promise<RespostaUsuario> {
    try {
      return await this.prisma.respostaUsuario.upsert({
        where: {
          usuarioId_questaoId: {
            usuarioId: data.usuarioId,
            questaoId: data.questaoId,
          },
        },
        create: {
          usuarioId: data.usuarioId,
          questaoId: data.questaoId,
          respostaQuestaoId: data.respostaQuestaoId,
          pontuacaoRecebida: data.pontuacaoRecebida,
        },
        update: {
          respostaQuestaoId: data.respostaQuestaoId,
          pontuacaoRecebida: data.pontuacaoRecebida,
          respondidaEm: new Date(),
        },
      });
    } catch (error) {
      console.error("Erro ao registrar resposta:", error);
      throw new Error("Não foi possível registrar a resposta.");
    }
  }

  async atualizarPontuacao(
    usuarioId: number,
    questaoId: number,
    pontuacao: number
  ): Promise<RespostaUsuario> {
    try {
      return await this.prisma.respostaUsuario.update({
        where: {
          usuarioId_questaoId: {
            usuarioId,
            questaoId,
          },
        },
        data: {
          pontuacaoRecebida: pontuacao,
        },
      });
    } catch (error) {
      console.error("Erro ao atualizar pontuação da resposta:", error);
      throw new Error("Não foi possível atualizar a pontuação.");
    }
  }
}

export const usuarioRespostaRepository = new UsuarioRespostaRepository(prisma);