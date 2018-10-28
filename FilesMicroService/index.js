const config = require("./config");
const app    = require("./fileRoutes");

app.listen(config.port, () => {
    console.log("Server is running on", config.port);
});