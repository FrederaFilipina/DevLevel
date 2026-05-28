import { Router } from 'express';
import { UsuarioController } from '../controllers/usuarioController';

const router = Router();
const controller = new UsuarioController();

router.post('/', controller.criar);
router.get('/:id', controller.obter);
router.get('/', controller.listar);
router.put('/:id', controller.atualizar);
router.delete('/:id', controller.deletar);

export default router;
