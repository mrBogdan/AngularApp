const ExpressCassandra = require('express-cassandra');
const config = require('../config');

const cassandra = ExpressCassandra.createClient({
    clientOptions: {
        contactPoints: [config.DB_HOST],
        protocolOptions: { port: config.DB_PORT},
        keyspace: config.DB_KEYSPACE,
        queryOptions: {consistency: ExpressCassandra.consistencies.one}
    },
    ormOptions: {
        defaultReplicationStrategy : {
            class: 'SimpleStrategy',
            replication_factor: 3
        },
        migration: 'safe',
    }
});

module.exports = cassandra;