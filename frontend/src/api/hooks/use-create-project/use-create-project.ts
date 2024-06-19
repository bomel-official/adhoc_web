import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AccountTurnoverDTO, InventoryBalanceDTO, Project, ProjectDTO } from "../../../types";
import { useHttp } from "../../request";
import { ResponseData } from "../../use-get-request";
import { DEFAULT_ACCOUNT_TURNOVER, DEFAULT_INVENTORY_BALANCE, DEFAULT_PROJECT } from "./constants";

export function useCreateProject( defaultValues: Project | null, onSuccess?: ( project: Project ) => void ) {
    const navigate = useNavigate();

    const [ data, setData ] = useState<ProjectDTO>( DEFAULT_PROJECT );
    const {
        request: requestCreateProject, error, loading, clearError, setError
    } = useHttp<ResponseData<Project>, ProjectDTO>();
    const [ isSucceeded, setIsSucceeded ] = useState<boolean>( false );

    useEffect( () => {
        if ( isSucceeded ) {
            setTimeout( () => setIsSucceeded( false ), 5000 );
        }
    }, [ isSucceeded ] );

    useEffect( () => {
        if ( defaultValues ) {
            setData( {
                id: defaultValues.id,
                title: defaultValues.title,
                accountTurnovers: defaultValues.accountTurnovers.map( accountTurnover => ({
                    ...accountTurnover,
                    file: null
                }) ),
                inventoryBalances: defaultValues.inventoryBalances.map( inventoryBalance => ({
                    ...inventoryBalance,
                    file: null
                }) )
            } );
        }
    }, [ defaultValues ] );

    const [ newAccountTurnover, setNewAccountTurnover ] = useState<AccountTurnoverDTO>( DEFAULT_ACCOUNT_TURNOVER );
    const [ newInventoryBalance, setNewInventoryBalance ] = useState<InventoryBalanceDTO>( DEFAULT_INVENTORY_BALANCE );

    const submit = async () => {
        try {
            const formData = new FormData();

            const accountTurnoversFormData = JSON.stringify( data.accountTurnovers.map( ( at, i ) => {
                if ( at.file ) {
                    formData.set( `accountTurnoverFile${ i }`, at.file );
                } else if ( !at.id ) {
                    throw new Error( `Не добавлен файл для Оборота по счёту №${ i + 1 }` );
                }

                const atDTO: Omit<AccountTurnoverDTO, "file"> = {
                    bill: at.bill,
                    year: at.year,
                    quarter: at.quarter,
                    type: at.type,
                    filename: at.filename
                };
                if ( at.id ) {
                    atDTO.id = at.id;
                }

                return atDTO;
            } ) );
            const inventoryBalancesFormData = JSON.stringify( data.inventoryBalances.map( ( ib, i ) => {
                if ( ib.file ) {
                    formData.set( `inventoryBalanceFile${ i }`, ib.file );
                } else if ( !ib.id ) {
                    throw new Error( `Не добавлен файл для Складских остатков №${ i }` );
                }

                const ibDTO: Omit<InventoryBalanceDTO, "file"> = {
                    bill: ib.bill,
                    date: ib.date,
                    filename: ib.filename
                };
                if ( ib.id ) {
                    ibDTO.id = ib.id;
                }

                return ibDTO;
            } ) );
            if ( data.id ) {
                formData.set( "id", data.id.toString() );
            }
            formData.set( "title", data.title );
            formData.set( "accountTurnovers", accountTurnoversFormData );
            formData.set( "inventoryBalances", inventoryBalancesFormData );

            clearError();

            const { data: fetchedData } = await requestCreateProject(
                "/api/user/project",
                "POST",
                formData,
                {},
                false
            );
            setIsSucceeded( true );
            if ( typeof onSuccess === "function" ) {
                onSuccess( fetchedData );
            }
            navigate( `/project/${ fetchedData.id }` );
        } catch ( e: any ) {
            setError( e.message );
        }
    };

    const setDataField = <TKey extends keyof ProjectDTO>( key: TKey, value: ProjectDTO[TKey] ) => {
        setData(
            ( prevState ) => ({ ...prevState, [key]: value }) );
    };

    const addAccountTurnoverFile = () => {
        setData(
            ( prevState ) => ({
                ...prevState, accountTurnovers: [ ...prevState.accountTurnovers, newAccountTurnover ]
            }) );
        setNewAccountTurnover( DEFAULT_ACCOUNT_TURNOVER );
    };

    const removeAccountTurnoverFile = ( index: number ) => {
        setData( ( prevState ) => ({
            ...prevState, accountTurnovers: prevState.accountTurnovers.filter( ( _, i ) => i !== index )
        }) );
    };

    const addInventoryBalancesFile = () => {
        setData(
            ( prevState ) => ({
                ...prevState, inventoryBalances: [ ...prevState.inventoryBalances, newInventoryBalance ]
            }) );
        setNewInventoryBalance( DEFAULT_INVENTORY_BALANCE );
    };

    const removeInventoryBalancesFile = ( index: number ) => {
        setData( ( prevState ) => ({
            ...prevState, inventoryBalances: prevState.inventoryBalances.filter( ( _, i ) => i !== index )
        }) );
    };

    return {
        submit, addAccountTurnoverFile, removeAccountTurnoverFile, addInventoryBalancesFile,
        removeInventoryBalancesFile, setDataField, data, error, loading,
        newAccountTurnover, newInventoryBalance, setNewAccountTurnover, setNewInventoryBalance, isSucceeded
    };
}
