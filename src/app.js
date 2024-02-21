import express from 'express'
import projectsRoutes from './routes/projects.routes.js'
import tasksRoutes    from './routes/task.routes.js';

const app = express()

//middlewares
app.use(express.json()) //parsear los datos del body en formato JSON


app.use(projectsRoutes);
app.use(tasksRoutes);



export default app;
