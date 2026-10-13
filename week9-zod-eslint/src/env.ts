import dotenv from "dotenv";
import { z } from "zod";
dotenv.config();

const envSchema = z.object({
  DB_USER: z.string().min(1),
  DB_PASSWORD:
        z.string().min(1),
  DB_DATABASE:
        z.string().min(1),
  DB_HOST: z.string().min(1),
  DB_PORT:
        z.coerce.number().int().positive(), PORT: z.coerce.number().int().positive(). default(5432),
});
const env = envSchema.safeParse(process.env);
if (!env.success) {
  console.error(z.treeifyError(env.error));
  process.exit(1);
}
export const config =
    env.data!;
