import { adminKeycloak, adminKeycloakConfig, CV, generateValidator, isError } from "@core";
import { NextFunction, Request, Response } from "express";

export async function postOneUser( req: Request, res: Response, next: NextFunction ) {
    const validated = generateValidator(
        () => ({
            username: new CV( req.body.username, { label: "username" } ).string().val,
            email: new CV( req.body.email, { label: "email" } ).string().val,
            password: new CV( req.body.password, { label: "password" } ).string().val,
            role: new CV( req.body.role, { label: "role" } ).string().included( [ "user", "admin" ] ).val,
            firstName: new CV( req.body.firstName, { label: "firstName" } ).string().val,
            lastName: new CV( req.body.lastName, { label: "lastName" } ).string().val,
        })
    );
    if ( isError( validated ) ) {
        return res.status( 400 )
            .json( { message: validated.errorObject.message } );
    }
    const { username, email, password, role, firstName, lastName } = validated.data;

    let roles: null | string[] = null;
    if ( role === "admin" ) {
        roles = [ "admin", "user" ];
    } else if ( role === "user" ) {
        roles = [ "user" ];
    }

    if ( !roles ) {
        return res.status( 400 ).json( { message: "Некорректно заполнено полу role" } );
    }

    const data: UserRepresentationTelegramUser = {
        username,
        enabled: true,
        email,
        firstName,
        lastName,
        credentials: [ {
            type: "password", value: password
        } ],
        realmRoles: [ ...roles, "offline_access" ],
        clientRoles: {
            account: [ "manage-account" ], glavcontrol_client: roles
        }
    };

    try {
        // @ts-ignore
        await adminKeycloak.auth( adminKeycloakConfig );
        const user = await adminKeycloak.users.create( data );
        data.id = user.id;
        data.credentials = undefined;

        return res.json( { data } );
    } catch ( e ) {
        // @ts-ignore
        return res.status(400).json( { message: (e && e.message) ? e.message : 'Ошибка запроса' } );
    }
}
