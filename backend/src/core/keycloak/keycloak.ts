import { getEnv } from "@core";
import KcAdminClient from "@keycloak/keycloak-admin-client";
import expressSession from "express-session";
import Keycloak from "keycloak-connect";

const keycloakConfig = {
    clientId: getEnv( process.env.KEYCLOAK_CLIENT_ID ),
    bearerOnly: true,
    serverUrl: getEnv( process.env.KEYCLOAK_URL ),
    realm: getEnv( process.env.KEYCLOAK_REALM ),
    realmPublicKey: getEnv( process.env.KEYCLOAK_PUBLIC_KEY )
};

const adminKeycloakConfig = {
    username: getEnv( process.env.KEYCLOAK_ADMIN_USERNAME ),
    password: getEnv( process.env.KEYCLOAK_ADMIN_PASSWORD ),
    grantType: "password",
    clientId: "admin-cli",
};

const memoryStore = new expressSession.MemoryStore();
// @ts-ignore
const keycloak = new Keycloak( { store: memoryStore }, keycloakConfig );

const session = expressSession( {
    secret: getEnv( process.env.EXPRESS_SESSION_SECRET ),
    resave: false,
    saveUninitialized: true,
    store: memoryStore
} );

const adminKeycloak = new KcAdminClient( {
    baseUrl: getEnv( process.env.KEYCLOAK_URL ),
    realmName: getEnv( process.env.KEYCLOAK_REALM )
} );

export { keycloak, adminKeycloak, adminKeycloakConfig, session };
