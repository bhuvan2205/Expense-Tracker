import { Hono } from "hono";
import { authClient, getUser, sessionManager } from "server/auth";

export const authRoute = new Hono();

authRoute
	.get("/login", async (c) => {
		const loginUrl = await authClient.login(sessionManager(c));
		return c.redirect(loginUrl.toString());
	})
	.get("/register", async (c) => {
		const registerUrl = await authClient.register(sessionManager(c));
		return c.redirect(registerUrl.toString());
	})
	.get("/callback", async (c) => {
		const url = new URL(c.req.url);
		await authClient.handleRedirectToApp(sessionManager(c), url);
		return c.redirect("/");
	})
	.get("/logout", async (c) => {
		const logoutUrl = await authClient.logout(sessionManager(c));
		return c.redirect(logoutUrl.toString());
	})
	.get("/me", getUser, async (c) => {
		const { user } = c.var || {};
		return c.json({ user });
	});
