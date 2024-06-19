import { ApiError } from "@core";
import { Request, Response } from "express";

export function errorHandlingMiddleware( err: Error | ApiError, req: Request | Response,
                                         res: Response ) {
    if ( err instanceof ApiError ) {
        return res.status( err.status ).json( { message: err.message } );
    }
    // @ts-ignore
    console.log( "Unhandled request", err.url ?? "unknown" );
    if ( "status" in req && typeof req.status === "function" ) {
        return req.status( 500 ).json( { message: "Непредвиденная ошибка сервера!" } );
    }
    return res.status( 404 )
        .json( { message: "Адрес завпроса не найден!" } );
}
