require("dotenv").config();

const server = require("./app");
const { Server } = require("socket.io");
const chalk = require("chalk");

const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST"],
  },
});

const onlineUser = {};
const onlineShop = {};

io.use((socket, next) => {
  const userId = socket.handshake.auth.userId;
  if (socket.handshake.auth.shopId) {
    const shopId = socket.handshake.auth.shopId;
    onlineShop[shopId] = socket.id;
  }
  //   socket.userId = userId;
  onlineUser[userId] = socket.id;
  next();
});

io.on("connection", (socket) => {
  console.log("onlineUser",onlineUser);
  console.log("onlineShop",onlineShop);
  socket.on("send_message", ({ to, from }) => {});
});

server.listen(process.env.PORT, () =>
  console.log(chalk.bgGreen.bold(`Server run on ${process.env.PORT}`))
);
