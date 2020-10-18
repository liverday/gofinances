import { Router } from 'express';

import sessionsRouter from './sessions.routes';
import transactionsRouter from './transactions.routes';
import usersRouter from './users.routes';
import categoriesRouter from './categories.routes';

const routes = Router();

routes.use('/transactions', transactionsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/categories', categoriesRouter);

export default routes;
