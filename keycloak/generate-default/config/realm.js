const realmConfig = {
    "realm": process.env.KEYCLOAK_REALM ?? 'glavcontrol',
    "enabled": true,
    "clients": [{
        "clientId": process.env.KEYCLOAK_CLIENT_ID ?? 'glavcontrol_client',
        "enabled": true,
        "publicClient": true,
        "directAccessGrantsEnabled": true,
        "redirectUris": [`${process.env.REACT_APP_URL ?? 'http://127.0.0.1:3000'}/*`],
        "webOrigins": [process.env.REACT_APP_URL ?? 'http://127.0.0.1:3000']
    }],
    "users": [{
        "username": "glavcontrol_user",
        "enabled": true,
        "email": "telegram-user@keycloak.org",
        "firstName": "Ryan",
        "lastName": "Gosling",
        "credentials": [{
            "type": "password", "value": "user"
        }],
        "realmRoles": ["user", "offline_access"],
        "clientRoles": {
            "account": ["manage-account"], "glavcontrol_client": ['user']
        }
    }, {
        "username": process.env.KEYCLOAK_ADMIN_USERNAME ?? "admin",
        "enabled": true,
        "email": "test@admin.org",
        "firstName": "Admin",
        "lastName": "Test",
        "credentials": [{
            "type": "password", "value": process.env.KEYCLOAK_ADMIN_PASSWORD ?? "admin"
        }],
        "realmRoles": ["user", "admin"],
        "clientRoles": {
            "realm-management": ["realm-admin"], "account": ["manage-account"], "glavcontrol_client": ["user", 'admin']
        }
    }],
    "roles": {
        "realm": [{
            "name": "user", "description": "User privileges"
        }, {
            "name": "admin", "description": "Administrator privileges"
        }]
    },
    "loginTheme": "material",
    "internationalizationEnabled": true,
    "supportedLocales": ["ru"],
    "defaultLocale": "ru"
}

export default realmConfig;
