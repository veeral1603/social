import app from "./app";
import "dotenv/config";
import { createServer } from "http";
import "dotenv/config";
import { initSocket } from "./socket";

const PORT = process.env["PORT"] || 3001;

const server = createServer(app);

initSocket(server);

server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
