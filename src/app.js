const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const authUserRoute = require("./routes/auth-user-route");
const authShopRoute = require("./routes/auth-shop-route");

const errorMiddleware = require("./middlewares/error");
const notFoundMiddleware = require("./middlewares/notFound");

// const { sequelize } = require("./models");
// sequelize.sync({ force: true });

app.use(express.json());

app.use("/user", authUserRoute);
app.use("/shop", authShopRoute)

app.use(errorMiddleware);
app.use(notFoundMiddleware);

module.exports = server;
