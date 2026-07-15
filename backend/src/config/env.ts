import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.string().default("development"),

  PORT: z.coerce.number().default(5000),

  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),

  JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),

  JWT_EXPIRES_IN: z.enum(["1d", "7d", "30d"]).default("1d"),
});

const parsedEnv = envSchema.parse(process.env);

const env = {
  nodeEnv: parsedEnv.NODE_ENV,

  port: parsedEnv.PORT,

  mongoUri: parsedEnv.MONGODB_URI,

  jwtSecret: parsedEnv.JWT_SECRET,

  jwtExpiresIn: parsedEnv.JWT_EXPIRES_IN,
};

export default env;