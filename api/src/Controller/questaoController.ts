import type { Request, Response } from 'express';
import { prisma } from '../prisma/prisma';
import { getParam, handleError } from './utils';
// import { QuestaoService } from '../Service/questaoService';

// const questaoService = new QuestaoService();

const respostaPublicaSelect = {
  id: true,
  titulo: true,
  codigoResposta: true,
};

export class QuestaoController {
  async obter(req: Request, res: Response) {
    try {
      const id = getParam(req, 'id');
      // const questao = await questaoService.obter(id);
      const questao = await prisma.questao.findUnique({
        where: { id },
        include: {
          modulo: { include: { trilha: true } },
          respostas: {
            orderBy: { createdAt: 'asc' },
            select: respostaPublicaSelect,
          },
        },
      });

      if (!questao) return res.status(404).json({ erro: 'Questão não encontrada' });

      return res.json(questao);
    } catch (erro) {
      return handleError(res, erro, 'Erro ao obter questão');
    }
  }

  async listarPorModulo(req: Request, res: Response) {
    try {
      const moduloId = getParam(req, 'moduloId');
      // const questoes = await questaoService.listarPorModulo(moduloId);
      const questoes = await prisma.questao.findMany({
        where: { moduloId },
        orderBy: { ordem: 'asc' },
        include: {
          respostas: {
            orderBy: { createdAt: 'asc' },
            select: respostaPublicaSelect,
          },
        },
      });

      return res.json(questoes);
    } catch (erro) {
      return handleError(res, erro, 'Erro ao listar questões');
    }
  }
}

// export const questaoController = new QuestaoController(questaoService);
