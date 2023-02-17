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

server.listen(process.env.PORT, () =>
  console.log(chalk.bgGreen.bold(`Server run on ${process.env.PORT}`))
);
