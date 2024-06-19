import {
    CV,
    generateValidator,
    isError,
    ProjectRepository,
    TelegramUserProjectRepository,
    TelegramUserRepository
} from "@core";
import { NextFunction, Request, Response } from "express";

export async function deleteRemoveAccess( req: Request, res: Response, next: NextFunction ) {
    const validated = generateValidator(
        () => ({
            projectId: new CV( req.body.projectId, { label: "projectId" } ).number().val,
            telegramUserId: new CV( req.body.telegramUserId,
                { label: "telegramUserId" } ).number().val,
        })
    );
    if ( isError( validated ) ) {
        return res.status( 400 )
            .json( { message: validated.errorObject.message } );
    }
    const { telegramUserId, projectId } = validated.data;

    const telegramUser = await TelegramUserProjectRepository.destroy( {
        where: {
            telegramUserId,
            projectId
        }
    } );
    const updatedTelegramUser = await TelegramUserRepository.findByPk(
        telegramUserId,
        {
            include: [ {
                model: ProjectRepository,
                as: "projects"
            } ]
        }
    );

    return res.json( { data: updatedTelegramUser } );
}
