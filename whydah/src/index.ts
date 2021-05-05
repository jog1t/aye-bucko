/* eslint-disable no-console */
import { Server } from "colyseus";
import { createServer } from "http";
import { monitor } from "@colyseus/monitor";
import * as express from "express";

const port = Number(process.env.PORT) || 3000;

async function bootstrap() {
	const app = express();
	app.use(express.json());
	app.use("/monitor", monitor());

	const gameServer = new Server({
		server: createServer(app),
	});

	return gameServer.listen(port);
}

bootstrap()
	.then(() => {
		console.log("Server started");
	})
	.catch(console.error);
