import { useCallback, useEffect, useState } from "react";
import { UserRepresentation } from "../../../types";
import { useHttp } from "../../request";
import { useDebounce } from "../../use-debounce";
import { ResponseData } from "../../use-get-request";

export function useGetUsers( s: string = "" ) {
    const [ data, setData ] = useState<UserRepresentation[]>( [] );
    const { request, loading } = useHttp<ResponseData<UserRepresentation[]>>();
    const debounced = useDebounce( s );

    const fetchData = useCallback( async () => {
        const searchParams = new URLSearchParams( { s: debounced } );
        const fetchedData = await request(
            `/api/admin/users?${ searchParams.toString() }`,
            "GET",
        );
        setData( fetchedData.data );
    }, [ request, debounced ] );

    useEffect( () => {
        fetchData().catch( () => {} );
    }, [ debounced ] );

    return { data, loading, setData };
}
