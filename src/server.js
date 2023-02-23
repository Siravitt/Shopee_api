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
  const shopId = socket.handshake.auth.shopId;
  //   socket.userId = userId;
  onlineUser[userId] = socket.id;
  onlineShop[shopId] = socket.id;
  next();
});

io.on("connection", (socket) => {
  console.log(onlineShop, onlineUser);
  socket.on("send_message", () => {})
});

server.listen(process.env.PORT, () =>
  console.log(chalk.bgGreen.bold(`Server run on ${process.env.PORT}`))
);
