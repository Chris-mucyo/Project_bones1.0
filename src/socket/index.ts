import { Server } from "socket.io";
import { chatSocket } from "../modules/chat/chat.socket";

export const initSocket = (server: any) => {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    chatSocket(io, socket);
  });
};
