import { TelegramUser } from "./telegram-user";

export interface UserRepresentation {
    id?: string;
    username: string,
    enabled: true,
    email: string
    firstName: string,
    lastName: string,
    credentials: [ {
        type: string, value: string
    } ],
    realmRoles: string[],
    clientRoles: {
        account: string[], glavcontrol_client: string[]
    },
    telegramUser?: TelegramUser;
}

export interface UserRepresentationDTO {
    username: string,
    email: string
    password: string,
    role: "user" | "admin",
    firstName: string,
    lastName: string,
}
