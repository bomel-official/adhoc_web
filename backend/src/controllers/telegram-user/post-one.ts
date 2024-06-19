import { CV, generateValidator, isError, TelegramUserRepository } from "@core";
import { NextFunction, Request, Response } from "express";

export async function postOne( req: Request, res: Response, next: NextFunction ) {
    if ( !req.user ) {
        return res.status( 401 ).json( { message: "Не авторизован" } );
    }
    const validated = generateValidator(
        () => ({
            telegramId: new CV( req.body.id, { label: "id" } ).number().val,
            firstName: new CV( req.body.first_name,
                { label: "first_name" } ).string().val,
            authDate: new CV( req.body.auth_date,
                { label: "auth_date" } ).number().val,
            hash: new CV( req.body.hash, { label: "hash" } ).string().val,
            lastName: new CV( req.body.last_name,
                { label: "last_name" } ).optional().string().val,
            photoUrl: new CV( req.body.photo_url,
                { label: "photo_url" } ).optional().string().val,
            username: new CV( req.body.username,
                { label: "username" } ).optional()
                .string().val
        })
    );
    if ( isError( validated ) ) {
        return res.status( 400 )
            .json( { message: validated.errorObject.message } );
    }

    const telegramUser = await TelegramUserRepository.create( {
        ...validated.data,
        keycloakId: req.user.sub
    } );

    return res.json( { data: telegramUser } );
}
