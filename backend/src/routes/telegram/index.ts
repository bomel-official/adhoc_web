import { getManyProject, getOneProject, getOneTelegramUser, postPutOneProject } from "@controllers";
import { Router } from "express";

const telegramRouter = Router();

telegramRouter.get( "/telegram-user", getOneTelegramUser);

telegramRouter.get( "/project/:id", getOneProject );
telegramRouter.get( "/projects", getManyProject );

export { telegramRouter };
