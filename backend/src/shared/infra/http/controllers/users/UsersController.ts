import { Request, Response } from 'express';

import CreateUserService from '../../../../../modules/users/services/CreateUserService';

export default class UsersController {
  async store(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return res.json(user);
  }
}
