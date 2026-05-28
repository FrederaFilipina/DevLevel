import { Request, Response } from 'express';

export class QuestaoController {
  async criar(req: Request, res: Response) {
    try {
      const { moduloId, titulo, descricao, dificuldade, xpRecompensa, ordem } = req.body;
      // Implementar lógica com QuestaoService
      res.status(201).json({ message: 'Questão criada com sucesso' });
    } catch (erro) {
      res.status(500).json({ erro: 'Erro ao criar questão' });
    }
  }

  async obter(req: Request, res: Response) {
    try {
      const { id } = req.params;
      // Implementar lógica com QuestaoService
      res.json({ message: `Obtendo questão ${id}` });
    } catch (erro) {
      res.status(500).json({ erro: 'Erro ao obter questão' });
    }
  }

  async listarPorModulo(req: Request, res: Response) {
    try {
      const { moduloId } = req.params;
      // Implementar lógica com QuestaoService
      res.json({ message: `Questões do módulo ${moduloId}` });
    } catch (erro) {
      res.status(500).json({ erro: 'Erro ao listar questões' });
    }
  }

  async atualizar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { titulo, descricao, dificuldade, xpRecompensa, ordem } = req.body;
      // Implementar lógica com QuestaoService
      res.json({ message: `Questão ${id} atualizada` });
    } catch (erro) {
      res.status(500).json({ erro: 'Erro ao atualizar questão' });
    }
  }

  async deletar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      // Implementar lógica com QuestaoService
      res.status(204).send();
    } catch (erro) {
      res.status(500).json({ erro: 'Erro ao deletar questão' });
    }
  }
}
