import { useCallback, useEffect, useState } from "react";
import { keycloak } from "../../../core";
import { Project } from "../../../types";
import { useHttp } from "../../request";
import { ResponseData } from "../../use-get-request";

export function useGetProject( id: undefined | string ) {
    const [ data, setData ] = useState<Project | null>( null );
    const { request, loading } = useHttp<ResponseData<Project | null>>();

    const fetchData = useCallback( async () => {
        const fetchedData = await request(
            `/api/user/project/${ id }`,
            "GET",
            null,
            {
                Authorization: `Bearer ${ keycloak.token }`
            },
            true
        );
        setData( fetchedData.data );
    }, [ request, id ] );

    useEffect( () => {
        if ( id ) {
            fetchData().catch();
        }
    }, [ id ] );

    return { data, loading, setData };
}
