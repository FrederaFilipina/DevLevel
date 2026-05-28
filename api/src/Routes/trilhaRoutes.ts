import { Router } from 'express';
import { TrilhaController } from '../Controller/trilhaController';

const router = Router();
const controller = new TrilhaController();

router.post('/usuarios/iniciar', controller.iniciarTrilha);
router.get('/usuarios/:usuarioId', controller.trilhasDoUsuario);
router.put('/usuarios/:id', controller.atualizarProgresso);
router.patch('/usuarios/:id/concluir', controller.concluirTrilha);
router.get('/tema/:temaId', controller.listarPorTema);
router.get('/', controller.listar);
router.get('/:id', controller.obter);

export default router;
