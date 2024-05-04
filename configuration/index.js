import gamechampions from "./gamechampions";
import incrediblechampions from "./incrediblechampions";

const BRAND_CONFIGURATIONS = {
  gamechampions,
  incrediblechampions
};

Object.freeze(BRAND_CONFIGURATIONS);

const brandName = process.env.BRAND_NAME.toLowerCase();

if (!Object.getOwnPropertyDescriptor(BRAND_CONFIGURATIONS, brandName))
  throw Error("Brand Config not found!");

const CURRENT_BRAND_CONFIG = BRAND_CONFIGURATIONS[brandName];

const config = process.env.IS_DEV
  ? CURRENT_BRAND_CONFIG.dev
  : CURRENT_BRAND_CONFIG.prod;

export const theme = CURRENT_BRAND_CONFIG.theme;

export default config;
