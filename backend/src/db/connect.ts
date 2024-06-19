import { getEnv } from "@core";
import { Sequelize } from "sequelize-typescript";
import { AccountTurnover } from "../core/models/account-turnover/account-turnover";
import { InventoryBalance } from "../core/models/inventory-balance/inventory-balance";

import { Project } from "../core/models/project/project";
import { TelegramUserProject } from "../core/models/telegram-user-project/telegram-user-project";
import { TelegramUser } from "../core/models/telegram-user/telegram-user";

export const Database = new Sequelize(
    getEnv( process.env.DB_NAME ),
    getEnv( process.env.DB_USER ),
    getEnv( process.env.DB_PASSWORD ),
    {
        models: [ Project, TelegramUserProject, TelegramUser, AccountTurnover, InventoryBalance ],
        repositoryMode: true,
        dialect: "postgres",
        host: getEnv( process.env.DB_HOST ),
        port: parseInt( getEnv( process.env.DB_PORT ) )
    }
);
