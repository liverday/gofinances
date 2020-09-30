import { Request, Response, NextFunction, request } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '../../../errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const { authorization } = req.headers;

  if (!authorization) throw new AppError('JWT Token is Missing', 401);

  const [, token] = authorization.split(' ');

  try {
    const decoded = verify(token, process.env.AUTH_JWT_SECRET as string);

    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    };

    next();
  } catch {
    throw new AppError('Invalid JWT', 401);
  }
}
