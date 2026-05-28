import type { Request, Response } from 'express';
import { prisma } from '../prisma/prisma';
import { getParam, handleError, removeUndefined } from './utils';
// import { HabilidadeService } from '../Service/habilidadeService';

// const habilidadeService = new HabilidadeService();

export class HabilidadeController {
  async obter(req: Request, res: Response) {
    try {
      const id = getParam(req, 'id');
      // const habilidade = await habilidadeService.obter(id);
      const habilidade = await prisma.habilidade.findUnique({ where: { id } });
      if (!habilidade) return res.status(404).json({ erro: 'Habilidade não encontrada' });
      return res.json(habilidade);
    } catch (erro) {
      return handleError(res, erro, 'Erro ao obter habilidade');
    }
  }

  async listar(_req: Request, res: Response) {
    try {
      // const habilidades = await habilidadeService.listar();
      const habilidades = await prisma.habilidade.findMany({ orderBy: { nome: 'asc' } });
      return res.json(habilidades);
    } catch (erro) {
      return handleError(res, erro, 'Erro ao listar habilidades');
    }
  }

  async vincularUsuario(req: Request, res: Response) {
    try {
      const { usuarioId, habilidadeId } = req.body;
      if (!usuarioId || !habilidadeId) {
        return res.status(400).json({ erro: 'usuarioId e habilidadeId são obrigatórios' });
      }

      // const habilidadeUsuario = await habilidadeService.vincularUsuario({ usuarioId, habilidadeId });
      const habilidadeUsuario = await prisma.habilidadeUsuario.create({
        data: { usuarioId, habilidadeId },
        include: { habilidade: true },
      });

      return res.status(201).json(habilidadeUsuario);
    } catch (erro) {
      return handleError(res, erro, 'Erro ao vincular habilidade');
    }
  }

  async habilidadesDoUsuario(req: Request, res: Response) {
    try {
      const usuarioId = getParam(req, 'usuarioId');
      // const habilidades = await habilidadeService.habilidadesDoUsuario(usuarioId);
      const habilidades = await prisma.habilidadeUsuario.findMany({
        where: { usuarioId },
        include: { habilidade: true },
        orderBy: { updatedAt: 'desc' },
      });

      return res.json(habilidades);
    } catch (erro) {
      return handleError(res, erro, 'Erro ao listar habilidades do usuário');
    }
  }

  async atualizarPontuacao(req: Request, res: Response) {
    try {
      const id = getParam(req, 'id');
      const { pontuacao, nivel } = req.body;
      // const habilidade = await habilidadeService.atualizarPontuacao(id, { pontuacao, nivel });
      const habilidade = await prisma.habilidadeUsuario.update({
        where: { id },
        data: removeUndefined({ pontuacao, nivel }),
        include: { habilidade: true },
      });

      return res.json(habilidade);
    } catch (erro) {
      return handleError(res, erro, 'Erro ao atualizar pontuação');
    }
  }

  async desvincularUsuario(req: Request, res: Response) {
    try {
      const id = getParam(req, 'id');
      // await habilidadeService.desvincularUsuario(id);
      await prisma.habilidadeUsuario.delete({ where: { id } });
      return res.status(204).send();
    } catch (erro) {
      return handleError(res, erro, 'Erro ao desvincular habilidade');
    }
  }
}


// export const habilidadeController = new HabilidadeController(habilidadeService);
