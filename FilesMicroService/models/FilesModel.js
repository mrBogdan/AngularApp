const cassandra = require('../components/database');

const FileSchema = {
    fields: {
        id: {
            type: "uuid",
            default: {"$db_function": "uuid()"}
        },
        name: { type: "varchar", default: "no name provided"},
        size: "double",
        upload: {
            type: "timestamp",
            default: {"$db_function": "toTimestamp(now())"}
        }
    },
    key: ["id"]
};

const fileModel = cassandra.loadSchema('files', FileSchema);

module.exports = {
    fileModel: fileModel,
    cassandra: cassandra
};