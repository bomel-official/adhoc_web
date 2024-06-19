import { useCallback, useEffect, useState } from "react";
import { useHttp } from "../request";
import { ResponseData } from "./types";

export function useGetRequest<TData>( defaultValue: TData, url: string,
                                      onError: ( e: unknown ) => void = () => {} ) {
    const [ data, setData ] = useState<TData>( defaultValue );
    const { request, loading } = useHttp<ResponseData<TData>>();

    const fetchData = useCallback( async () => {
        const fetchedData = await request(
            url,
            "GET",
        );
        setData( fetchedData.data );
    }, [ request, url ] );

    useEffect( () => {
        fetchData().catch( onError );
    }, [] );

    return { data, loading, setData };
}
