import { Router } from 'express';

import AuthUserService from '../../../../modules/users/services/AuthUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authUserService = new AuthUserService();

  const { user, token } = await authUserService.execute({ email, password });

  return response.json({ user, token });
});

export default sessionsRouter;
