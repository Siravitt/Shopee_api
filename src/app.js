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
const orderShopRoute = require("./routes/orderShop-route");
const chatShopRoute = require("./routes/chatShop-route");

const authUserRoute = require("./routes/authUser-route");
const profileUserRoute = require("./routes/profileUser-route");
const addressUserRoute = require("./routes/addressUser-route");
const cartUserRoute = require("./routes/cartUser-route");
const orderUserRoute = require("./routes/orderUser-route");
const reviewUserRoute = require("./routes/reviewUser-route");
const checkoutUserRoute = require("./routes/checkoutUser-route");
const chatUserRoute = require("./routes/chatUser-route");

const errorMiddleware = require("./middlewares/error");
const notFoundMiddleware = require("./middlewares/notFound");

// const { sequelize } = require("./models");
// sequelize.sync({ force: true });

app.use(cors());
app.use(express.json());

app.use("/", publicRoute);
app.use("/search", publicRoute);

app.use("/user/auth", authUserRoute);
app.use("/user/profile", authenticateUser, profileUserRoute);
app.use("/user/address", authenticateUser, addressUserRoute);
app.use("/user/cart", authenticateUser, cartUserRoute);
app.use("/user/order", authenticateUser, orderUserRoute);
app.use("/user/review", authenticateUser, reviewUserRoute);
app.use("/user/checkout", authenticateUser, checkoutUserRoute);
app.use("/user/chat", authenticateUser, chatUserRoute);

app.use("/shop/auth", authenticateUser, authShopRoute);
app.use("/shop/profile", authenticateUser, profileShopRoute);
app.use("/shop/product/", authenticateUser, productShopRoute);
app.use("/shop/order", authenticateUser, orderShopRoute);
app.use("/shop/chat", authenticateUser, chatShopRoute);

app.use(errorMiddleware);
app.use(notFoundMiddleware);

module.exports = server;
