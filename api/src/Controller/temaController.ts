import type { Request, Response } from 'express';
import { prisma } from '../prisma/prisma';
import { getParam, handleError } from './utils';
// import { TemaService } from '../Service/temaService';

// const temaService = new TemaService();

export class TemaController {
  async obter(req: Request, res: Response) {
    try {
      const id = getParam(req, 'id');
      // const tema = await temaService.obter(id);
      const tema = await prisma.tema.findUnique({
        where: { id },
        include: {
          trilhas: { orderBy: { ordem: 'asc' }, include: { modulos: { orderBy: { ordem: 'asc' } } } },
        },
      });

      if (!tema) return res.status(404).json({ erro: 'Tema não encontrado' });

      return res.json(tema);
    } catch (erro) {
      return handleError(res, erro, 'Erro ao obter tema');
    }
  }

  async listar(_req: Request, res: Response) {
    try {
      // const temas = await temaService.listar();
      const temas = await prisma.tema.findMany({
        orderBy: { nome: 'asc' },
        include: { trilhas: { orderBy: { ordem: 'asc' } } },
      });

      return res.json(temas);
    } catch (erro) {
      return handleError(res, erro, 'Erro ao listar temas');
    }
  }

  async vincularUsuario(req: Request, res: Response) {
    try {
      const { usuarioId, temaId } = req.body;
      if (!usuarioId || !temaId) return res.status(400).json({ erro: 'usuarioId e temaId são obrigatórios' });

      // const temaUsuario = await temaService.vincularUsuario({ usuarioId, temaId });
      const temaUsuario = await prisma.temaUsuario.upsert({
        where: { usuarioId_temaId: { usuarioId, temaId } },
        update: {},
        create: { usuarioId, temaId },
        include: { tema: true },
      });

      return res.status(201).json(temaUsuario);
    } catch (erro) {
      return handleError(res, erro, 'Erro ao vincular tema');
    }
  }

  async temasDoUsuario(req: Request, res: Response) {
    try {
      const usuarioId = getParam(req, 'usuarioId');
      // const temas = await temaService.temasDoUsuario(usuarioId);
      const temas = await prisma.temaUsuario.findMany({
        where: { usuarioId },
        include: { tema: { include: { trilhas: { orderBy: { ordem: 'asc' } } } } },
        orderBy: { createdAt: 'desc' },
      });

      return res.json(temas);
    } catch (erro) {
      return handleError(res, erro, 'Erro ao listar temas do usuário');
    }
  }

  async desvincularUsuario(req: Request, res: Response) {
    try {
      const id = getParam(req, 'id');
      // await temaService.desvincularUsuario(id);
      await prisma.temaUsuario.delete({ where: { id } });
      return res.status(204).send();
    } catch (erro) {
      return handleError(res, erro, 'Erro ao desvincular tema');
    }
  }
}

// export const temaController = new TemaController(temaService);
