import express from 'express';
import ClassesController from './controllers/ClassesController';
import ConnectionControllers from './controllers/ConnectionControllers';

const routes = express.Router();
const classesControllers = new ClassesController();
const connectionControllers = new ConnectionControllers();
// GET Buscar ou lista uma informção
// POST Criar alguma informação
// PUT Atualizar alguma informação existente
// DELETE Deletar alguma informação existente

routes.post('/classes', classesControllers.create);
routes.get('/classes', classesControllers.index);

routes.post('/connections', connectionControllers.create);
routes.get('/connections', connectionControllers.index);

// routes.get("/classes")

export default routes;
