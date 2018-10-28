const config    = require("./config");
const cassandra = require("cassandra-driver");

const client = new cassandra.Client({
    contactPoints: config.DB_HOST,
    keyspace: config.DB_NAME
});

client.connect((err, result) => {
    if (err) {
        console.log("Connect failed");
    } else {
        console.log("Cassandra connected");
    }
});

module.exports = {
    client: client
};