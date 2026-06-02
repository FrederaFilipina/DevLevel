import type { Request, Response } from "express";
import type { TemaService } from "../Services/temaService";

export class TemaController {
  constructor(
    private readonly temaService: TemaService
  ) { }

  async listar(_req: Request, res: Response) {
    try {
      const temas =
        await this.temaService.listarTodos();

      return res.status(200).json(temas);
    } catch {
      return res.status(500).json({
        erro: "Erro ao listar temas",
      });
    }
  }

  async obter(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);


      if (isNaN(id)) {
        return res.status(400).json({
          erro: "ID invalido.",
        });
      }

      const tema =
        await this.temaService.buscarPorId(id);
      if (!tema) {
        return res.status(404).json({
          erro: "Tema não encontrado."
        });
      }

      return res.status(200).json(tema);
    } catch {
      return res.status(500).json({
        erro: "Erro ao obter tema",
      });
    }
  }

  async buscarPorNome(req: Request, res: Response) {
    try {
      const nome = String(req.params.nome ?? "");

      if (!nome.trim()) {
  return res.status(400).json({
    erro: "Nome inválido."
  });
}
      const tema =
        await this.temaService.buscarPorNome(nome);

        

if (!tema) {
  return res.status(404).json({
    erro: "Tema não encontrado."
  });
}

      return res.status(200).json(tema);
    } catch {
      return res.status(500).json({
        erro: "Erro ao buscar tema por nome",
      });
    }
  }
}
