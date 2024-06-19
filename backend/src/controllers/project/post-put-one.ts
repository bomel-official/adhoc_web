import {
    AccountTurnoverRepository,
    CV,
    generateValidator,
    InventoryBalanceRepository,
    isError,
    Project,
    ProjectRepository,
    TelegramUserProjectRepository,
    TelegramUserRepository,
    uploadFile
} from "@core";
import { NextFunction, Request, Response } from "express";

export async function postPutOne( req: Request, res: Response, next: NextFunction ) {
    if ( !req.user ) {
        return res.status( 401 ).json( { message: "Не авторизован" } );
    }
    if ( !req.telegram ) {
        return res.status( 401 ).json( { message: "Не авторизован в телеграм. Сначала подклюите телеграм аккаунт." } );
    }
    const validated = generateValidator(
        () => ({
            id: new CV( req.body.id, { label: "id" } ).optional().number().val,
            title: new CV( req.body.title, { label: "title" } ).string().val,
            accountTurnovers: new CV( req.body.accountTurnovers, { label: "accountTurnovers" } ).array(
                ( accountTurnover ) => new CV( accountTurnover ).object( ( accountTurnoverObj ) => ({
                    id: new CV( accountTurnoverObj.id ).optional().number().val,
                    bill: new CV( accountTurnoverObj.bill ).number().val,
                    year: new CV( accountTurnoverObj.year ).number().val,
                    quarter: new CV( accountTurnoverObj.quarter ).number().val,
                    type: new CV( accountTurnoverObj.type ).string().included( [ "turnover", "turnover balance" ] ).val,
                    filename: new CV( accountTurnoverObj.filename ).string().val
                }) ).val ).val,
            inventoryBalances: new CV( req.body.inventoryBalances, { label: "inventoryBalances" } ).array(
                ( inventoryBalance ) => new CV( inventoryBalance ).object( ( inventoryBalanceObj ) => ({
                    id: new CV( inventoryBalance.id ).optional().number().val,
                    bill: new CV( inventoryBalance.bill ).number().val,
                    date: new CV( inventoryBalance.date ).string().val,
                    filename: new CV( inventoryBalance.filename ).string().val,
                }) ).val ).val
        })
    );
    if ( isError( validated ) ) {
        return res.status( 400 )
            .json( { message: validated.errorObject.message } );
    }
    const { id, title, accountTurnovers, inventoryBalances } = validated.data;

    let project: Project | null;

    if ( id ) { // Edit project

        project = await ProjectRepository.findByPk( id, {
            include: [
                { model: AccountTurnoverRepository, as: "accountTurnovers" },
                { model: InventoryBalanceRepository, as: "inventoryBalances" },
            ]
        } );

        if ( !project ) {
            return res.status( 400 ).json( { message: "Проект с таким ID не найден" } );
        }

        project.title = title;
        await project.save();

        const accountTurnoversExclude: number[] = accountTurnovers.filter(at => !!at.id).map(at => at.id) as number[];
        let inventoryBalancesExclude: number[] = inventoryBalances.filter(ib => !!ib.id).map(ib => ib.id) as number[];

        for ( const accountTurnover of project.accountTurnovers ) {
            if (!accountTurnoversExclude.includes(accountTurnover.id)) {
                await accountTurnover.destroy();
            }
        }
        for ( const inventoryBalance of project.inventoryBalances ) {
            if (!inventoryBalancesExclude.includes(inventoryBalance.id)) {
                await inventoryBalance.destroy();
            }
        }

    } else { // Create project

        project = await ProjectRepository.create( {
            title
        } );
        await TelegramUserProjectRepository.create( {
            projectId: project.id,
            telegramUserId: req.telegram.id,
        } );

    }

    for ( let i = 0; i < accountTurnovers.length; i++ ) {
        const file = req.files ? req.files[`accountTurnoverFile${ i }`] ?? null : null;
        const url = await uploadFile( file );

        if ( !url ) continue;

        const accountTurnoverData = accountTurnovers[i];
        const accountTurnover = await AccountTurnoverRepository.create( {
            bill: accountTurnoverData.bill,
            year: accountTurnoverData.year,
            quarter: accountTurnoverData.quarter,
            type: accountTurnoverData.type,
            filename: accountTurnoverData.filename,
            url,
            projectId: project.id
        } );
    }

    for ( let i = 0; i < inventoryBalances.length; i++ ) {
        const file = req.files ? req.files[`inventoryBalanceFile${ i }`] ?? null : null;
        const url = await uploadFile( file );

        if ( !url ) continue;

        const inventoryBalanceData = inventoryBalances[i];
        const inventoryBalance = await InventoryBalanceRepository.create( {
            bill: inventoryBalanceData.bill,
            date: inventoryBalanceData.date,
            filename: inventoryBalanceData.filename,
            url,
            projectId: project.id
        } );
    }

    const returnProject = await ProjectRepository.findByPk( project.id, {
        include: [
            { model: AccountTurnoverRepository, as: "accountTurnovers" },
            { model: InventoryBalanceRepository, as: "inventoryBalances" },
            { model: TelegramUserRepository, as: "users" }
        ]
    } );

    return res.json( { data: returnProject } );
}
