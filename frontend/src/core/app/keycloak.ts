import Keycloak from "keycloak-js";
import { getEnv } from "../libs/get-env";

const keycloak = new Keycloak( {
    url: getEnv( process.env.REACT_APP_URL ),
    realm: getEnv( process.env.REACT_APP_REALM ),
    clientId: getEnv( process.env.REACT_APP_CLIENT_ID )
} );

function initKeycloak() {
    return keycloak.init( {
        onLoad: "login-required",
        redirectUri: getEnv( process.env.REACT_APP_CLIENT_URL ),
        checkLoginIframe: true,
        pkceMethod: "S256"
    } ).then( ( auth ) => {
        if ( !auth ) {
            window.location.reload();
        }
    });
}

export { keycloak, initKeycloak };
