import { Router } from 'express';
import { ConquistaController } from '../Controller/conquistaController';

const router = Router();
const controller = new ConquistaController();

router.post('/usuarios/desbloquear', controller.desbloquearConquista);
router.get('/usuarios/:usuarioId', controller.conquistasDoUsuario);
router.delete('/usuarios/:id', controller.deletarDesbloqueio);
router.get('/', controller.listar);
router.get('/:id', controller.obter);

export default router;
