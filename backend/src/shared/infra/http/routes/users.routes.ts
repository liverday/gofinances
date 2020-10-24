import { Router } from 'express';

import UsersController from '../controllers/users/UsersController';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post('/', usersController.store);

export default usersRouter;
