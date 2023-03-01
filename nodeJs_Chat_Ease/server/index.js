import { WebSocketServer } from "ws";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5000;

const wss = new WebSocketServer(
  {
    port: PORT,
  },
  () => console.log("Сервер запущен")
);

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    message = JSON.parse(message);

    multiClient(message);
  });
});

const multiClient = (message) => {
  wss.clients.forEach((c) => c.send(JSON.stringify(message)));
};
