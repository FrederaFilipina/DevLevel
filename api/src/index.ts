import express from "express"
import usuarioRoutes from './usuarioRoutes';
import temaRoutes from './temaRoutes';
import trilhaRoutes from './trilhaRoutes';
import moduloRoutes from './moduloRoutes';
import questaoRoutes from './questaoRoutes';
import respostaRoutes from './respostaRoutes';
import conquistaRoutes from './conquistaRoutes';
import habilidadeRoutes from './habilidadeRoutes';
import insigniaRoutes from './insigniaRoutes';
import rankingRoutes from './rankingRoutes';



const port = 3000
const app = express()

app.use(express.json())


app.use('/api/usuarios', usuarioRoutes);
app.use('/api/temas', temaRoutes);
app.use('/api/trilhas', trilhaRoutes);
app.use('/api/modulos', moduloRoutes);
app.use('/api/questoes', questaoRoutes);
app.use('/api/respostas', respostaRoutes);
app.use('/api/conquistas', conquistaRoutes);
app.use('/api/habilidades', habilidadeRoutes);
app.use('/api/insignias', insigniaRoutes);
app.use('/api/ranking', rankingRoutes);


app.listen(port,()=> console.log("Servidor rodando...  (: "))


export default app