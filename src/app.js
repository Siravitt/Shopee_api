const cors = require("cors");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const publicRoute = require("./routes/public/public-route");

const userCartRouter = require("./routes/user/user-cart-route");
const userChatRoute = require("./routes/user/user-chat-route");
const userAuthRoute = require("./routes/user/user-auth-route");

const shopAuthRoute = require("./routes/shop/shop-auth-route");
const shopChatRoute = require("./routes/shop/shop-chat-route");
const shopProductRoute = require("./routes/shop/shop-product-route");

const userAuthenticate = require("./middlewares/userAuthenticate");
const shopAuthenticate = require("./middlewares/shopAuthenticate");
const errorMiddleware = require("./middlewares/error");
const notFoundMiddleware = require("./middlewares/notFound");

// const { sequelize } = require("./models");
// sequelize.sync({ force: true });

app.use(cors());
app.use(express.json());

app.use("/user", userAuthRoute);
app.use("/user/chat", userAuthenticate, userChatRoute);
app.use("/user/cart", userAuthenticate, userCartRouter);
app.use("/shop", shopAuthRoute);
app.use("/shop/chat", shopAuthenticate, shopChatRoute);
app.use("/shop/product", shopAuthenticate, shopProductRoute);

app.use("/public", publicRoute);

app.use(errorMiddleware);
app.use(notFoundMiddleware);

module.exports = server;
