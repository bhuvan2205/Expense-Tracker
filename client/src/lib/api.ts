import { hc } from "hono/client";
import { ApiTypes } from "@server/app";

const hcClient = hc<ApiTypes>('/');

export const api = hcClient.api;
