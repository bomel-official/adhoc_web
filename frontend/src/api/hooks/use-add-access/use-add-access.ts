import { useCallback } from "react";
import { AccessDTO, TelegramUser, TelegramUserDTO } from "../../../types";
import { useHttp } from "../../request";
import { ResponseData, useGetRequest } from "../../use-get-request";

export function useAddAccess() {
    const { request: requestOnAuth } = useHttp<ResponseData<TelegramUser>, AccessDTO>();

    return async ( projectId: number, telegramUserId: number ) => {
        const fetchedData = await requestOnAuth(
            "/api/admin/add-access",
            "POST",
            { projectId, telegramUserId }
        );
        return fetchedData.data;
    };
}
