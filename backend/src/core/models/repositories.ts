import { Database } from "@db";
import { AccountTurnover } from "./account-turnover/account-turnover";
import { InventoryBalance } from "./inventory-balance/inventory-balance";
import { Project } from "./project/project";
import { TelegramUserProject } from "./telegram-user-project/telegram-user-project";
import { TelegramUser } from "./telegram-user/telegram-user";

export const TelegramUserProjectRepository = Database.getRepository( TelegramUserProject );

export const TelegramUserRepository = Database.getRepository( TelegramUser );

export const AccountTurnoverRepository = Database.getRepository( AccountTurnover );

export const InventoryBalanceRepository = Database.getRepository( InventoryBalance );

export const ProjectRepository = Database.getRepository( Project );
