import { AccessDTO, TelegramUser } from "../../../types";
import { useHttp } from "../../request";
import { ResponseData } from "../../use-get-request";

export function useRemoveAccess() {
    const { request: requestOnAuth } = useHttp<ResponseData<TelegramUser>, AccessDTO>();

    return async ( projectId: number, telegramUserId: number ) => {
        const fetchedData = await requestOnAuth(
            "/api/admin/remove-access",
            "DELETE",
            { projectId, telegramUserId }
        );
        return fetchedData.data;
    };
}
