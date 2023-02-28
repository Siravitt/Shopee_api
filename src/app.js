const cors = require("cors");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const authenticateUser = require("./middlewares/userAuthenticate");

const publicRoute = require("./routes/public-route");

const authShopRoute = require("./routes/authShop-route");
const profileShopRoute = require("./routes/profileShop-route");
const productShopRoute = require("./routes/productShop-route");

const authUserRoute = require("./routes/authUser-route");
const profileUserRoute = require("./routes/profileUser-route");
const addressUserRoute = require("./routes/addressUser-route");

const errorMiddleware = require("./middlewares/error");
const notFoundMiddleware = require("./middlewares/notFound");

// const { sequelize } = require("./models");
// sequelize.sync({ force: true });

app.use(cors());
app.use(express.json());

app.use("/", publicRoute);

app.use("/user/auth", authUserRoute);
app.use("/user/profile", authenticateUser, profileUserRoute);
app.use("/user/address", authenticateUser, addressUserRoute);

app.use("/shop/auth", authenticateUser, authShopRoute);
app.use("/shop/profile", authenticateUser, profileShopRoute);
app.use("/shop/product", authenticateUser, productShopRoute);

app.use(errorMiddleware);
app.use(notFoundMiddleware);

module.exports = server;
