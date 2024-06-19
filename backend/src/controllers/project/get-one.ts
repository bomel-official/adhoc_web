import {
    AccountTurnoverRepository,
    CV,
    generateValidator,
    InventoryBalanceRepository,
    isError,
    ProjectRepository
} from "@core";
import { NextFunction, Request, Response } from "express";

export async function getOne( req: Request, res: Response, next: NextFunction ) {
    const validated = generateValidator(
        () => ({
            id: new CV( req.params.id, { label: "id" } ).number().val,
        })
    );
    if ( isError( validated ) ) {
        return res.status( 400 )
            .json( { message: validated.errorObject.message } );
    }
    const { id } = validated.data;

    const project = await ProjectRepository.findByPk( id, {
        include: [
            { model: AccountTurnoverRepository },
            { model: InventoryBalanceRepository }
        ]
    } );
    return res.status( 200 ).json( { data: project } );
}
