import { useCallback } from "react";
import { TelegramUser, TelegramUserDTO } from "../../../types";
import { useHttp } from "../../request";
import { useGetRequest } from "../../use-get-request";

export function useTelegramAuth() {
    const { request: requestOnAuth } = useHttp<TelegramUser, TelegramUserDTO>();

    const { data, loading, setData } = useGetRequest<TelegramUser | null>(
        null,
        "/api/user/telegram-user" );

    const handleOnAuth = useCallback( async ( data: TelegramUserDTO ) => {
        const fetchedData = await requestOnAuth(
            "/api/user/telegram-user",
            "POST",
            data
        );
        setData( fetchedData );
    }, [] );

    return { handleOnAuth, data, loading };
}
