import 'dotenv/config';

import KcAdminClient from '@keycloak/keycloak-admin-client';
import config from '../config/connect.js';
import realmConfig from '../config/realm.js';

async function generate() {
    const adminClient = new KcAdminClient({
        baseUrl: config.baseUrl
    })

    await adminClient.auth(config.adminClient);

    await adminClient.realms.create(realmConfig);
}

generate().finally(() => {
})
