import { NextFunction, Request, Response } from "express";
import { jwtService } from "../application/jwt-service";
import { HTTP_STATUSES } from "../setting";
import { blacklistTokens } from "../db/db";


export const verifyTokenInCookie = async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(HTTP_STATUSES.NOT_AUTHORIZED_401)
  }

  try {
    const decodedToken = await jwtService.verifyRefreshToken(refreshToken);

    const tokenExpired = decodedToken.exp * 1000 < Date.now() + 20 * 1000;

    if (tokenExpired) {
      return res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZED_401);
    }

    const tokenExists = await blacklistTokens.findOne({ refreshToken });

    if (tokenExists) {
      return res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZED_401);
    }
    
    next();

  } catch (error) {
    return res.status(HTTP_STATUSES.NOT_AUTHORIZED_401)
  }
};

