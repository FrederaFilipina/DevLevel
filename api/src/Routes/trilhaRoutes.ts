import { Router } from 'express';
import { TrilhaController } from '../controllers/trilhaController';

const router = Router();
const controller = new TrilhaController();

router.post('/', controller.criar);
router.get('/:id', controller.obter);
router.get('/tema/:temaId', controller.listarPorTema);
router.get('/', controller.listar);
router.put('/:id', controller.atualizar);
router.delete('/:id', controller.deletar);

// TrilhaUsuario routes
router.post('/usuarios/iniciar', controller.iniciarTrilha);
router.get('/usuarios/:usuarioId', controller.trilhasDoUsuario);
router.put('/usuarios/:id', controller.atualizarProgresso);
router.patch('/usuarios/:id/concluir', controller.concluirTrilha);

export default router;
