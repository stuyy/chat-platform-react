import { createContext } from "react";
import { io } from "socket.io-client";

export const socket = io(import.meta.env.VITE_WEBSOCKET_URL!, {
	withCredentials: true,
});
export const SocketContext = createContext(socket);
