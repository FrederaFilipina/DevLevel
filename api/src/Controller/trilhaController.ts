import type { Request, Response } from 'express';
import { prisma } from '../prisma/prisma';
import { getParam, handleError, removeUndefined } from './utils';
// import { TrilhaService } from '../Service/trilhaService';

// const trilhaService = new TrilhaService();

export class TrilhaController {
  async obter(req: Request, res: Response) {
    try {
      const id = getParam(req, 'id');
      // const trilha = await trilhaService.obter(id);
      const trilha = await prisma.trilha.findUnique({
        where: { id },
        include: {
          tema: true,
          trilhaAnterior: true,
          proximasTrilhas: true,
          modulos: {
            orderBy: { ordem: 'asc' },
            include: { questoes: { orderBy: { ordem: 'asc' } } },
          },
        },
      });

      if (!trilha) return res.status(404).json({ erro: 'Trilha não encontrada' });

      return res.json(trilha);
    } catch (erro) {
      return handleError(res, erro, 'Erro ao obter trilha');
    }
  }

  async listarPorTema(req: Request, res: Response) {
    try {
      const temaId = getParam(req, 'temaId');
      // const trilhas = await trilhaService.listarPorTema(temaId);
      const trilhas = await prisma.trilha.findMany({
        where: { temaId },
        orderBy: { ordem: 'asc' },
        include: { modulos: { orderBy: { ordem: 'asc' } } },
      });

      return res.json(trilhas);
    } catch (erro) {
      return handleError(res, erro, 'Erro ao listar trilhas');
    }
  }

  async listar(_req: Request, res: Response) {
    try {
      // const trilhas = await trilhaService.listar();
      const trilhas = await prisma.trilha.findMany({
        orderBy: [{ temaId: 'asc' }, { ordem: 'asc' }],
        include: { tema: true, modulos: { orderBy: { ordem: 'asc' } } },
      });

      return res.json(trilhas);
    } catch (erro) {
      return handleError(res, erro, 'Erro ao listar trilhas');
    }
  }

  async iniciarTrilha(req: Request, res: Response) {
    try {
      const { usuarioId, trilhaId } = req.body;
      if (!usuarioId || !trilhaId) return res.status(400).json({ erro: 'usuarioId e trilhaId são obrigatórios' });

      // const progresso = await trilhaService.iniciarTrilha({ usuarioId, trilhaId });
      const trilha = await prisma.trilha.findUnique({ where: { id: trilhaId } });
      if (!trilha) return res.status(404).json({ erro: 'Trilha não encontrada' });

      const progresso = await prisma.trilhaUsuario.upsert({
        where: { usuarioId_trilhaId: { usuarioId, trilhaId } },
        update: {},
        create: {
          usuarioId,
          trilhaId,
          pontuacaoNecessaria: trilha.pontuacaoMinima,
          podeDesbloquear: trilha.pontuacaoMinima === 0,
        },
        include: { trilha: true },
      });

      return res.status(201).json(progresso);
    } catch (erro) {
      return handleError(res, erro, 'Erro ao iniciar trilha');
    }
  }

  async trilhasDoUsuario(req: Request, res: Response) {
    try {
      const usuarioId = getParam(req, 'usuarioId');
      // const trilhas = await trilhaService.trilhasDoUsuario(usuarioId);
      const trilhas = await prisma.trilhaUsuario.findMany({
        where: { usuarioId },
        include: { trilha: { include: { tema: true, modulos: { orderBy: { ordem: 'asc' } } } } },
        orderBy: { iniciadaEm: 'desc' },
      });

      return res.json(trilhas);
    } catch (erro) {
      return handleError(res, erro, 'Erro ao listar trilhas do usuário');
    }
  }

  async atualizarProgresso(req: Request, res: Response) {
    try {
      const id = getParam(req, 'id');
      const { status, pontuacaoAtual, pontuacaoNecessaria, percentualConclusao, podeDesbloquear, moduloAtualId, questaoAtualId } = req.body;
      // const progresso = await trilhaService.atualizarProgresso(id, { status, pontuacaoAtual, pontuacaoNecessaria, percentualConclusao, podeDesbloquear, moduloAtualId, questaoAtualId });
      const progresso = await prisma.trilhaUsuario.update({
        where: { id },
        data: removeUndefined({
          status,
          pontuacaoAtual,
          pontuacaoNecessaria,
          percentualConclusao,
          podeDesbloquear,
          moduloAtualId,
          questaoAtualId,
        }),
        include: { trilha: true },
      });

      return res.json(progresso);
    } catch (erro) {
      return handleError(res, erro, 'Erro ao atualizar progresso');
    }
  }

  async concluirTrilha(req: Request, res: Response) {
    try {
      const id = getParam(req, 'id');
      // const progresso = await trilhaService.concluirTrilha(id);
      const progresso = await prisma.trilhaUsuario.update({
        where: { id },
        data: { status: 'CONCLUIDA', percentualConclusao: 100, concluidaEm: new Date() },
        include: { trilha: true },
      });

      return res.json(progresso);
    } catch (erro) {
      return handleError(res, erro, 'Erro ao concluir trilha');
    }
  }
}


// export const trilhaController = new TrilhaController(trilhaService);
