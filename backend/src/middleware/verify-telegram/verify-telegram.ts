import { getEnv, TelegramUserRepository } from "@core";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export async function verifyTelegramMiddleware( req: Request, res: Response,
                                                next: NextFunction ) {
    if ( req.method === "OPTIONS" ) {
        next();
    }

    if ( typeof req.headers.telegram === "string" ) {
        try {
            const token = req.headers.telegram;
            if ( !token ) {
                return res.status( 401 ).json( { message: "Не авторизован" } );
            }

            const { telegramId } = jwt.verify( token, getEnv(
                process.env.TELEGRAM_BOT_SECRET ) ) as { telegramId: string };
            const telegramUser = await TelegramUserRepository.findOne( {
                where: { telegramId }
            } );
            if ( !telegramUser ) {
                return res.status( 401 ).json( { message: "Не авторизован" } );
            }

            req.telegram = telegramUser;
            return next();
        } catch ( e ) {
            return res.status( 401 ).json( { message: "Не авторизован" } );
        }
    }

    return res.status( 401 ).json( { message: "Не авторизован" } );
}
