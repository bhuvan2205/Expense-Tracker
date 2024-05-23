import {
	createKindeServerClient,
	GrantType,
	type SessionManager,
	type UserType,
} from "@kinde-oss/kinde-typescript-sdk";
import type { Context } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";

// Client for authorization code flow
export const authClient = createKindeServerClient(
	GrantType.AUTHORIZATION_CODE,
	{
		authDomain: process.env.KINDE_DOMAIN!,
		clientId: process.env.KINDE_CLIENT_ID!,
		clientSecret: process.env.KINDE_CLIENT_SECRET!,
		redirectURL: process.env.KINDE_REDIRECT_URI!,
		logoutRedirectURL: process.env.KINDE_LOGOUT_REDIRECT_URI!,
	}
);

let store: Record<string, unknown> = {};

export const sessionManager = (c: Context): SessionManager => ({
	async getSessionItem(key: string) {
		const result = getCookie(c, key);
		return result;
	},
	async setSessionItem(key: string, value: unknown) {
		const cookieOption = {
			httpOnly: true,
			sameSite: "Lax",
			secure: true,
		} as const;
		if (typeof value === "string") {
			setCookie(c, key, value, cookieOption);
		} else {
			setCookie(c, key, JSON.stringify(value), cookieOption);
		}
	},
	async removeSessionItem(key: string) {
		deleteCookie(c, key);
	},
	async destroySession() {
		["id_token", "access_token", "user", "refresh_token"].forEach((key) => {
			deleteCookie(c, key);
		});
	},
});

type Env = {
	Variables: {
		user: UserType;
	};
};

export const getUser = createMiddleware<Env>(async (c, next) => {
	try {
		const manager = sessionManager(c);
		const isAuthenticated = await authClient.isAuthenticated(manager); // Boolean: true or false
		if (!isAuthenticated) {
			return c.json({ error: "UnAuthorized" }, 401);
		}
		const user = await authClient.getUserProfile(manager);

		c.set("user", user);
		await next();
	} catch (error) {}
});
