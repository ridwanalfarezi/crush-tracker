import { config } from "dotenv";

config({ path: ".env" });

export const { PORT, MONGO_URI, API_URL, NODE_ENV } = process.env;
