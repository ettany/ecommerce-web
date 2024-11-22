const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};
const removeUserById = (userId) => {
  users = users.filter((user) => user.userId !== userId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};
io.on("connection", (socket) => {
  // When connect
  console.log("a user connected.");
  //   io.emit("welcome", "hello this is socket server!");

  // remove user when log out
  socket.on("removeUser", (userId) => {
    removeUserById(userId);
    console.log("online users", users);
    io.emit("getUsers", users);
  });

  // take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    console.log("online users", users);
    io.emit("getUsers", users);
  });

  // send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    if (user) {
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    }
  });

  // send and get new Notification rollback order
  socket.on("sendNotify", () => {
    io.emit("getNotify", {});
  });

  // send and get admin watch Notification rollback order
  // socket.on("sendAdminWatchNotifyRollback", () => {
  //   io.emit("getAdminWatchNotifyRollback", {});
  // });

  // send and get new Notification new order create
  socket.on("sendNotifyNewOrder", () => {
    io.emit("getNotifyNewOrder", {});
  });

  // send and get new product comment
  socket.on("sendProductComment", () => {
    io.emit("getProductComment", {});
  });

  // send and get success pay order
  socket.on("sendSuccessPay", () => {
    io.emit("getSuccessPay", {});
  });

  // send and get success deliver
  socket.on("sendSuccessDeliver", () => {
    io.emit("getSuccessDeliver", {});
  });

  // send and get success deliver
  socket.on("sendNotifyHandleRollback", () => {
    io.emit("getNotifyHandleRollback", {});
  });

  // When disconnect
  socket.on("disconnect", () => {
    console.log("someone has left");
    removeUser(socket.id);
    console.log("online users", users);
    io.emit("getUsers", users);
  });
});
