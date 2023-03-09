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

io.use((socket, next) => {
  const userId = socket.handshake.auth.userId;
  onlineUser[userId] = socket.id;
  next();
});

io.on("connection", (socket) => {
  console.log("onlineUser", onlineUser);
  socket.on("send_message", ({ to, from, message }) => {
    console.log(onlineUser[to]);
    socket.to(onlineUser[to]).emit("receive_message", {
      message: message,
      from: from,
    });
  });
});

server.listen(process.env.PORT, () =>
  console.log(chalk.bgGreen.bold(`Server run on ${process.env.PORT}`))
);
