import {
    adminKeycloak,
    adminKeycloakConfig,
    CV,
    generateValidator,
    isError,
    ProjectRepository,
    TelegramUserRepository
} from "@core";
import { NextFunction, Request, Response } from "express";

export async function getManyUser( req: Request, res: Response, next: NextFunction ) {
    const validated = generateValidator(
        () => ({
            s: new CV( req.query.s, { label: "s" } ).optional().string().val,
        })
    );
    if ( isError( validated ) ) {
        return res.status( 400 )
            .json( { message: validated.errorObject.message } );
    }
    const { s } = validated.data;

    // @ts-ignore
    await adminKeycloak.auth( adminKeycloakConfig );
    if ( s ) {
        const keycloakUsers: UserRepresentationTelegramUser[] = await adminKeycloak.users.find( { email: s } );
        for ( const keycloakUser of keycloakUsers ) {
            keycloakUser.telegramUser =
                await TelegramUserRepository.findOne( { where: { keycloakId: keycloakUser.id } } ) ?? undefined;
        }

        return res.json( { data: keycloakUsers } );
    } else {
        const keycloakUsers: UserRepresentationTelegramUser[] = await adminKeycloak.users.find();
        for ( const keycloakUser of keycloakUsers ) {
            keycloakUser.telegramUser =
                await TelegramUserRepository.findOne( {
                    where: { keycloakId: keycloakUser.id },
                    include: [ {
                        model: ProjectRepository,
                        as: "projects"
                    } ]
                } ) ?? undefined;
        }

        return res.json( { data: keycloakUsers } );
    }
}
