import { Router } from 'express';
import { RespostaController } from '../controllers/respostaController';

const router = Router();
const controller = new RespostaController();

router.post('/submeter', controller.submeterResposta);
router.get('/:id', controller.obter);
router.get('/usuario/:usuarioId', controller.respostasDoUsuario);
router.post('/questao/:questaoId', controller.criarRespostaPadrao);
router.get('/questao/:questaoId/opcoes', controller.listarOpcoes);
router.delete('/:id', controller.deletar);

export default router;
