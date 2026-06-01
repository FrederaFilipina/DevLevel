import { Router } from 'express';
import { RespostaController } from '../Controller/respostaController';

const router = Router();
const controller = new RespostaController();

router.post('/submeter', controller.submeterResposta);
router.get('/usuario/:usuarioId', controller.respostasDoUsuario);
router.get('/questao/:questaoId/opcoes', controller.listarOpcoes);
router.get('/:id', controller.obter);

export default router;
