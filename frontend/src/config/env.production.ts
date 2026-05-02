import { base } from "./env.base";

const APP_ENDPOINT = "https://crm.wisemanautomart.com";
const API_ENDPOINT = "https://api.wisemanautomart.com";

/*
 * Configuration for production env
 */

export const env_production = {
  ...base,
  MODE: "production",
  API_ENDPOINT,
  APP_ENDPOINT,
} as const;