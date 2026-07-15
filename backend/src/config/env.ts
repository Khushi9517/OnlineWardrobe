import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.string().default("development"),

  PORT: z.coerce.number().default(5000),

  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
});

const parsedEnv = envSchema.parse(process.env);

const env = {
  nodeEnv: parsedEnv.NODE_ENV,

  port: parsedEnv.PORT,

  mongoUri: parsedEnv.MONGODB_URI,
};

export default env;