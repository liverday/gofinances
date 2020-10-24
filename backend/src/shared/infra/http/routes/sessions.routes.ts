import { Router } from 'express';

import SessionsController from '../controllers/users/SessionsController';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post('/', sessionsController.store);

export default sessionsRouter;
