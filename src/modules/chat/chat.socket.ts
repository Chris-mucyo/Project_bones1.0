import { Server, Socket } from "socket.io";
import { SendMessage } from "./chart.service.js";

export const chatSocket = (io: Server, socket: Socket) => {
  socket.on("joinConversation", (conversationId: string) => {
    socket.join(conversationId);
  });

  socket.on("sendMessage", async (data) => {
    const message = await SendMessage(
      data.conversationId,
      data.senderId,
      data.content
    );

    io.to(data.conversationId).emit("newMessage", message);
  });
};
