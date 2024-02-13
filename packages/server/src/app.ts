import { publicProcedure, router } from "./trpc";
import { authRouter } from "./routers/auth";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const appRouter = router({
  greeting: publicProcedure.query(() => "Hello world !"),
  auth: authRouter,
});

// Export only the type of a router!
// This prevents us from importing server code on the client.
export type AppRouter = typeof appRouter;
