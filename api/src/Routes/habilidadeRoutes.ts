import { Router } from 'express';
import { HabilidadeController } from '../controllers/habilidadeController';

const router = Router();
const controller = new HabilidadeController();

router.post('/', controller.criar);
router.get('/:id', controller.obter);
router.get('/', controller.listar);
router.put('/:id', controller.atualizar);
router.delete('/:id', controller.deletar);

// HabilidadeUsuario routes
router.post('/usuarios/vincular', controller.vincularUsuario);
router.get('/usuarios/:usuarioId', controller.habilidadesDoUsuario);
router.put('/usuarios/:id', controller.atualizarPontuacao);
router.delete('/usuarios/:id', controller.desvincularUsuario);

export default router;
