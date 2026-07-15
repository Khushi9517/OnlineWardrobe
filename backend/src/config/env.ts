import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.string().default("development"),
  PORT: z.coerce.number().default(5000),
});

const parsedEnv = envSchema.parse(process.env);

const env = {
  nodeEnv: parsedEnv.NODE_ENV,
  port: parsedEnv.PORT,
};

export default env;