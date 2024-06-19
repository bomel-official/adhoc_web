export interface TelegramUserRequest {
    id: number;
    keycloakId: string;
    telegramId: number;
    firstName: string;
    authDate: number;
    hash: string;
    lastName?: string;
    photoUrl?: string;
    username?: string;
}
