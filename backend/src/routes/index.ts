import { keycloak } from "@core";
import { authMiddleware, verifyTelegramMiddleware } from "@middleware";
import express from "express";
import { adminRouter } from "./admin";
import { telegramRouter } from "./telegram";
import { userRouter } from "./user";

const router = express.Router();

router.use( "/admin", keycloak.protect( "admin" ),
    adminRouter );

router.use( "/user", keycloak.protect( "user" ), authMiddleware,
    userRouter );

router.use( "/telegram", verifyTelegramMiddleware,
    telegramRouter );

export { router };
