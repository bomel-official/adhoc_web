import { CV, generateValidator, isError, ProjectRepository, TelegramUserRepository } from "@core";
import { NextFunction, Request, Response } from "express";

export async function getMany( req: Request, res: Response, next: NextFunction ) {
    const validated = generateValidator(
        () => ({
            type: new CV( req.query.type, { label: "type" } ).string().included( [ "own", "others" ] ).val,
        })
    );
    if ( isError( validated ) ) {
        return res.status( 400 )
            .json( { message: validated.errorObject.message } );
    }
    const { type } = validated.data;

    if ( type === "own" ) {
        if ( !req.telegram ) {
            return res.status( 401 )
                .json( { message: "Не авторизован в телеграм. Сначала подклюите телеграм аккаунт." } );
        }
        const user = await TelegramUserRepository.findByPk( req.telegram.id, {
            include: {
                model: ProjectRepository
            }
        } );
        if ( !user ) {
            return res.json( { data: [] } );
        }
        return res.json( { data: user.projects } );
    }

    return res.status( 400 ).json( { message: "Некорректный запрос" } );
}
