/* eslint-disable no-console */
import { Server } from "colyseus";
import { createServer } from "http";
import { monitor } from "@colyseus/monitor";
import express from "express";
import { ROOMS } from "@jog1t/ambrose-light";
import cors from "cors";
import SampleRoom from "./rooms/SampleRoom";

const port = Number(process.env.PORT) || 3000;

async function bootstrap() {
	const app = express();
	// app.use(
	// 	cors({
	// 		origin: (requestOrigin, callback) => {
	// 			if (requestOrigin?.endsWith("jogit.pl")) {
	// 				return callback(null, true);
	// 			}
	// 			return callback(new Error("Not allowed by CORS"));
	// 		},
	// 	})
	// );
	app.use(express.json());
	app.use("/monitor", monitor());

	const gameServer = new Server({
		server: createServer(app),
	});

	gameServer.define(ROOMS.sampleRoom, SampleRoom);

	return gameServer.listen(port);
}

bootstrap()
	.then(() => {
		console.log("Server started");
	})
	.catch(console.error);
