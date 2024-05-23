import { Hono } from "hono";
import { logger } from "hono/logger";
import { expenseRoute } from "./routes/expenses";
import { serveStatic } from "hono/bun";
import { authRoute } from "./routes/auth";

const app = new Hono();

app.use("*", logger());

const apiRoutes = app
	.basePath("/api")
	.route("/expenses", expenseRoute)
	.route("/", authRoute);

app.get("*", serveStatic({ root: "./client/dist" }));
app.get("*", serveStatic({ path: "./client/dist/index.html" }));

export type ApiTypes = typeof apiRoutes;

export default app;
