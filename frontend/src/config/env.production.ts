import { base } from "./env.base";

const APP_ENDPOINT = "https://wiseman-crm.digisole.in";
const API_ENDPOINT = "https://wiseman-server.digisole.in";

/*
 * Configuration for production env
 */

export const env_production = {
  ...base,
  MODE: "production",
  API_ENDPOINT,
  APP_ENDPOINT,
} as const;