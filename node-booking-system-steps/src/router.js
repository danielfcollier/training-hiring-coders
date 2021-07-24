import { Router } from "express";
import Database from './database/index';
import multer from 'multer';

import UserController from "./app/controllers/UserController";
import SessionController from './app/controllers/SessionController'
import FileController from "./app/controllers/FileController";
import CollaboratorController from "./app/controllers/CollaboratorController";
import AppointmentController from "./app/controllers/AppointmentController";
import ScheduleController from "./app/controllers/ScheduleController";
import NotificationController from "./app/controllers/NotificationController";

import authMiddleware from './app/middlewares/auth'
import multerConfig from "./config/multer"
import Appointment from "./app/models/Appointment";

const routes = new Router();
const upload = multer(multerConfig);

routes.post("/users", UserController.store);
routes.post("/session", SessionController.store);


// Rotas autenticadas
routes.use(authMiddleware);
routes.put("/users", UserController.update);

// Lista de colaboradores
routes.get('/collaborator', CollaboratorController.index);

// Rota de agendamento
routes.post('/appointments', AppointmentController.store);

// Lista de agendamentos
routes.get('/appointments', AppointmentController.index);

// Listagem de agendamentos colaborador
routes.get('/schedule', ScheduleController.index)

// Listagem de notificações
routes.get('/notifications', NotificationController.index)
// Marcar como lida
routes.put('/notifications/:id', NotificationController.update)
// Upload de arquivos
routes.post('/files', upload.single('file'), FileController.store)
export default routes;
