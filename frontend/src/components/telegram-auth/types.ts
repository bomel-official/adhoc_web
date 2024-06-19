import { TelegramUser, TelegramUserDTO } from "../../types";

export interface TelegramAuthProps {
    loading: boolean;
    data: TelegramUser | null;
    handleOnAuth: ( data: TelegramUserDTO ) => Promise<void>;
}
