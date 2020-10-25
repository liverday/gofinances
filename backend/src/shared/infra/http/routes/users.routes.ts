import { Router } from 'express';

import UsersController from '../controllers/users/UsersController';
import isAuthenticated from '../middlewares/isAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post('/', usersController.store);
usersRouter.get('/me', isAuthenticated, usersController.show);

export default usersRouter;
