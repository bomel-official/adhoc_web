import { TelegramUserRepository } from "@core";
import { NextFunction, Request, Response } from "express";

export async function getOne( req: Request, res: Response, next: NextFunction ) {
    if ( req.user !== undefined ) {
        const telegramUser = await TelegramUserRepository.findOne( {
            where: {
                keycloakId: req.user.sub
            }
        } );
        return res.json( { data: telegramUser } );
    }

    if ( req.telegram !== undefined ) {
        return res.json( { data: req.telegram } );
    }

    return res.status( 401 ).json( { message: "Не авторизован" } );
}
