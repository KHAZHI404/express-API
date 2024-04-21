import { NextFunction, Request, Response } from "express";
import { jwtService } from "../application/jwt-service";
import { HTTP_STATUSES } from "../setting";
import { blacklistTokens } from "../db/db";

export const verifyTokenInBody = async (req: Request, res: Response, next: NextFunction) => {
        const refreshToken = req.body.accessToken;
      
        if (!refreshToken) {
          return res.status(HTTP_STATUSES.NOT_AUTHORIZED_401)
        }
      
        try {
          const decodedToken = jwtService.verifyRefreshToken(refreshToken);
      
          const tokenExists = await blacklistTokens.findOne({ refreshToken });
      
          if (tokenExists) {
            return res.status(HTTP_STATUSES.NOT_AUTHORIZED_401);
          }
      
          next();
        } catch (error) {
          return res.status(HTTP_STATUSES.NOT_AUTHORIZED_401)
        }
      };
      

