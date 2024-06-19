import { TelegramUserRepository } from "@core";
import { DecodedToken } from "@types";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export async function authMiddleware( req: Request, res: Response,
                                      next: NextFunction ) {
    if ( req.method === "OPTIONS" ) {
        next();
    }

    if ( req.headers.authorization ) {
        const token = req.headers.authorization.split( " " )[1];
        if ( !token ) {
            return res.status( 401 ).json( { message: "Не авторизован" } );
        }
        req.user = jwt.decode( token ) as DecodedToken;
        const telegramUser = await TelegramUserRepository.findOne( {
            where: { keycloakId: req.user.sub }
        } );
        if ( telegramUser ) {
            req.telegram = telegramUser;
        }
        return next();
    }

    return res.status( 401 ).json( { message: "Не авторизован" } );
}
