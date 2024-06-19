const baseUrl = process.env.KEYCLOAK_URL ?? 'http://127.0.0.1:8080';

const config = {
    baseUrl: baseUrl,
    token: {
        username: 'glavcontrol_user',
        password: 'user',
        grant_type: 'password',
        client_id: process.env.KEYCLOAK_CLIENT_ID ?? 'glavcontrol_client',
        realmName: process.env.KEYCLOAK_REALM ?? 'glavcontrol'
    },
    adminClient: {
        username: process.env.KEYCLOAK_ADMIN_USERNAME ?? "admin",
        password: process.env.KEYCLOAK_ADMIN_PASSWORD ?? "admin",
        grantType: 'password',
        clientId: 'admin-cli',
    }
};

export default config;
