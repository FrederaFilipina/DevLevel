import type { Request, Response } from 'express';
import { prisma } from '../prisma/prisma';
import { getParam, handleError } from './utils';
// import { ModuloService } from '../Service/moduloService';

// const moduloService = new ModuloService();

export class ModuloController {
  async obter(req: Request, res: Response) {
    try {
      const id = getParam(req, 'id');
      // const modulo = await moduloService.obter(id);
      const modulo = await prisma.modulo.findUnique({
        where: { id },
        include: { trilha: true, questoes: { orderBy: { ordem: 'asc' } } },
      });

      if (!modulo) return res.status(404).json({ erro: 'Módulo não encontrado' });

      return res.json(modulo);
    } catch (erro) {
      return handleError(res, erro, 'Erro ao obter módulo');
    }
  }

  async listarPorTrilha(req: Request, res: Response) {
    try {
      const trilhaId = getParam(req, 'trilhaId');
      // const modulos = await moduloService.listarPorTrilha(trilhaId);
      const modulos = await prisma.modulo.findMany({
        where: { trilhaId },
        orderBy: { ordem: 'asc' },
        include: { questoes: { orderBy: { ordem: 'asc' } } },
      });

      return res.json(modulos);
    } catch (erro) {
      return handleError(res, erro, 'Erro ao listar módulos');
    }
  }
}

// export const moduloController = new ModuloController(moduloService);
