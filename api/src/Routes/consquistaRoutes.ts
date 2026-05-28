import { Router } from 'express';
import { ConquistaController } from '../controllers/conquistaController';

const router = Router();
const controller = new ConquistaController();

router.post('/', controller.criar);
router.get('/:id', controller.obter);
router.get('/', controller.listar);
router.put('/:id', controller.atualizar);
router.delete('/:id', controller.deletar);

// ConquistaUsuario routes
router.post('/usuarios/desbloquear', controller.desbloquearConquista);
router.get('/usuarios/:usuarioId', controller.conquistasDoUsuario);
router.delete('/usuarios/:id', controller.deletarDesbloqueio);

export default router;
