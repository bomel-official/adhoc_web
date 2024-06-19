import type KcAdminClient from "@keycloak/keycloak-admin-client";
import cors from "cors";
import "dotenv/config";
import express from "express";
import fileUpload from "express-fileupload";
import fs from "fs";
import http from "http";
import https from "https";
import "module-alias/register";
import swaggerUi from "swagger-ui-express";
import "tsconfig-paths/register";
import { getEnv, keycloak, session, TelegramUser as TelegramUserClass } from "./core/index.js";

import { Database } from "./db/index.js";
import { errorHandlingMiddleware } from "./middleware/index.js";
import { router } from "./routes/index.js";
import { swaggerDocument } from "./swagger";
import { DecodedToken } from "./types/index.js";

const PORT = process.env.PORT || 3000;
const app = express();

const httpsEnabled = getEnv( process.env.HTTPS_ENABLED );

app.use( express.json() );
app.use( fileUpload( {} ) );
app.use( cors( {
    credentials: true, origin: getEnv( process.env.REACT_APP_CLIENT_URL )
} ) );

// Keycloak
app.use( session );
app.use( keycloak.middleware() );

// Routes
app.use( "/api", router );

// Serve static files
app.use( "/static", express.static( "static" ) );

app.use( "/api-docs", swaggerUi.serve, swaggerUi.setup( swaggerDocument ) );

// Error handling
app.use( errorHandlingMiddleware );

const start = async () => {
    try {
        await Database.authenticate();
        await Database.sync();

        if ( httpsEnabled === "true" ) {
            const privateKey = fs.readFileSync( getEnv( process.env.CERTIFICATE_PRIVATE_KEY_PATH ) );
            const certificate = fs.readFileSync( getEnv( process.env.CERTIFICATE_FILE_PATH ) );

            https.createServer( {
                key: privateKey,
                cert: certificate
            }, app ).listen( PORT, () => console.log( `Server started on port ${ PORT } with SSL Certificate` ) );
        } else {
            http.createServer( app ).listen( PORT, () => console.log( `Server started on port ${ PORT }` ) );
        }
    } catch ( e ) {
        console.log( e );
    }
};

type UserRepresentation = Exclude<Awaited<ReturnType<KcAdminClient["users"]["findOne"]>>, undefined>

declare global {
    namespace Express {
        export interface Request {
            user?: DecodedToken;
            telegram?: TelegramUserClass;
        }
    }

    export interface UserRepresentationTelegramUser extends UserRepresentation {
        telegramUser?: TelegramUserClass;
    }
}

start();
