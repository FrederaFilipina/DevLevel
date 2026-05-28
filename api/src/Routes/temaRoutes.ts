import { Router } from 'express';
import { TemaController } from '../controllers/temaController';

const router = Router();
const controller = new TemaController();

router.post('/', controller.criar);
router.get('/:id', controller.obter);
router.get('/', controller.listar);
router.put('/:id', controller.atualizar);
router.delete('/:id', controller.deletar);

// TemaUsuario routes
router.post('/usuarios/vincular', controller.vincularUsuario);
router.get('/usuarios/:usuarioId', controller.temasDoUsuario);
router.delete('/usuarios/:id', controller.desvincularUsuario);

export default router;
