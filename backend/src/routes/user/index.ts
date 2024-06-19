import {
    getManyProject,
    getOneProject,
    getOneTelegramUser,
    postOneTelegramUser,
    postPutOneProject
} from "@controllers";
import { Router } from "express";

const userRouter = Router();

userRouter.get( "/telegram-user", getOneTelegramUser );
userRouter.post( "/telegram-user", postOneTelegramUser );

userRouter.post( "/project", postPutOneProject );
userRouter.get( "/project/:id", getOneProject );
userRouter.get( "/projects", getManyProject );

export { userRouter };
