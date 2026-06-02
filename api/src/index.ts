import express from "express"
import temaRoutes from './Routes/temaRoutes';
import trilhaRoutes from './Routes/trilhaRoutes';
import moduloRoutes from './Routes/moduloRoutes';
import questaoRoutes from './Routes/questaoRoutes';
import respostaRoutes from './Routes/questaoRespostaRoutes';
import conquistaRoutes from './Routes/conquistaRoutes';
import habilidadeRoutes from './Routes/habilidadeRoutes';
import cors from "cors"
import { authRoutes } from "./Routes/AuthRoutes"
import { auth } from "./middleware/auth"


const port = 3000
const app = express()

app.use(express.json())

app.use(cors())

app.use(authRoutes)

app.use(auth)


app.use('/api/temas', temaRoutes);
app.use('/api/trilhas', trilhaRoutes);
app.use('/api/modulos', moduloRoutes);
app.use('/api/questoes', questaoRoutes);
app.use('/api/respostas', respostaRoutes);
app.use('/api/conquistas', conquistaRoutes);
app.use('/api/habilidades', habilidadeRoutes);



app.listen(port,()=> console.log("Servidor rodando...  (: "))


export default app
