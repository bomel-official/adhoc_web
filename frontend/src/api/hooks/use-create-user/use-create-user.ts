import { useEffect, useState } from "react";
import { UserRepresentation, UserRepresentationDTO } from "../../../types";
import { useHttp } from "../../request";
import { ResponseData } from "../../use-get-request";
import { DEFAULT_USER } from "./constants";

export function useCreateUser( onSuccess?: ( user: UserRepresentation ) => void ) {
    const [ data, setData ] = useState<UserRepresentationDTO>( DEFAULT_USER );
    const {
        request: requestOnSubmit, error, loading
    } = useHttp<ResponseData<UserRepresentation>, UserRepresentationDTO>();
    const [ isSucceeded, setIsSucceeded ] = useState<boolean>( false );

    useEffect( () => {
        if ( isSucceeded ) {
            setTimeout( () => setIsSucceeded( false ), 5000 );
        }
    }, [ isSucceeded ] );

    const submit = async () => {
        const fetchedData = await requestOnSubmit(
            "/api/admin/user",
            "POST",
            data
        );
        setIsSucceeded( true );
        if ( typeof onSuccess === "function" ) {
            onSuccess( fetchedData.data );
        }
        setData( DEFAULT_USER );
    };
    return { data, setData, submit, error, loading, isSucceeded };
}
