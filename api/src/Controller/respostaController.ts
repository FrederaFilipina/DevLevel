import type { Request, Response } from 'express';
import { prisma } from '../prisma/prisma';
import { getParam, handleError } from './utils';
// import { RespostaService } from '../Service/respostaService';

// const respostaService = new RespostaService();

const respostaPublicaSelect = {
  id: true,
  titulo: true,
  codigoResposta: true,
};

export class RespostaController {
  async submeterResposta(req: Request, res: Response) {
    try {
      const { usuarioId, questaoId, respostaQuestaoId } = req.body;
      if (!usuarioId || !questaoId || !respostaQuestaoId) {
        return res.status(400).json({ erro: 'usuarioId, questaoId e respostaQuestaoId são obrigatórios' });
      }

      // const resposta = await respostaService.submeterResposta({ usuarioId, questaoId, respostaQuestaoId });
      const respostaQuestao = await prisma.respostaQuestao.findUnique({
        where: { id: respostaQuestaoId },
        include: { questao: true },
      });

      if (!respostaQuestao || respostaQuestao.questaoId !== questaoId) {
        return res.status(404).json({ erro: 'Resposta da questão não encontrada' });
      }

      const respostaExistente = await prisma.respostaUsuario.findUnique({
        where: { usuarioId_questaoId: { usuarioId, questaoId } },
      });

      if (respostaExistente) {
        return res.status(409).json({ erro: 'Questão já respondida pelo usuário' });
      }

      const resposta = await prisma.$transaction(async (tx) => {
        const criada = await tx.respostaUsuario.create({
          data: {
            usuarioId,
            questaoId,
            respostaQuestaoId,
            pontuacaoRecebida: respostaQuestao.pontuacao,
          },
          include: { respostaQuestao: true, questao: true },
        });

        await tx.usuario.update({
          where: { id: usuarioId },
          data: {
            xp: { increment: respostaQuestao.questao.xpRecompensa },
            pontuacaoTotal: { increment: respostaQuestao.pontuacao },
          },
        });

        return criada;
      });

      return res.status(201).json(resposta);
    } catch (erro) {
      return handleError(res, erro, 'Erro ao submeter resposta');
    }
  }

  async obter(req: Request, res: Response) {
    try {
      const id = getParam(req, 'id');
      // const resposta = await respostaService.obter(id);
      const resposta = await prisma.respostaUsuario.findUnique({
        where: { id },
        include: { usuario: true, questao: true, respostaQuestao: true },
      });

      if (!resposta) return res.status(404).json({ erro: 'Resposta não encontrada' });

      return res.json(resposta);
    } catch (erro) {
      return handleError(res, erro, 'Erro ao obter resposta');
    }
  }

  async respostasDoUsuario(req: Request, res: Response) {
    try {
      const usuarioId = getParam(req, 'usuarioId');
      // const respostas = await respostaService.respostasDoUsuario(usuarioId);
      const respostas = await prisma.respostaUsuario.findMany({
        where: { usuarioId },
        include: { questao: true, respostaQuestao: true },
        orderBy: { respondidaEm: 'desc' },
      });

      return res.json(respostas);
    } catch (erro) {
      return handleError(res, erro, 'Erro ao listar respostas do usuário');
    }
  }

  async listarOpcoes(req: Request, res: Response) {
    try {
      const questaoId = getParam(req, 'questaoId');
      // const respostas = await respostaService.listarOpcoes(questaoId);
      const respostas = await prisma.respostaQuestao.findMany({
        where: { questaoId },
        orderBy: { createdAt: 'asc' },
        select: respostaPublicaSelect,
      });

      return res.json(respostas);
    } catch (erro) {
      return handleError(res, erro, 'Erro ao listar opções de resposta');
    }
  }
}

// export const respostaController = new RespostaController(respostaService);
