import { Project } from "./project";

export interface TelegramUser {
    id: number;
    keycloakId: string;
    telegramId: number;
    first_name: string;
    auth_date: number;
    hash: string;
    last_name?: string;
    photo_url?: string;
    username?: string;
    projects?: Project[];
}

export interface TelegramUserDTO {
    id: number;
    first_name: string;
    auth_date: number;
    hash: string;
    last_name?: string;
    photo_url?: string;
    username?: string;
}
