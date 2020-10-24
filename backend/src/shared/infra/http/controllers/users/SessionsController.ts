import { Request, Response } from 'express';

import AuthUserService from '../../../../../modules/users/services/AuthUserService';

export default class SessionController {
  async store(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authUserService = new AuthUserService();

    const { user, token } = await authUserService.execute({ email, password });

    return res.json({ user, token });
  }
}
