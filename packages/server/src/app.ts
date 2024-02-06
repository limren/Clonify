import { publicProcedure, router } from "./trpc";
import { userRouter } from "./routers/user";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const appRouter = router({
  greeting: publicProcedure.query(() => "Hello world !"),
  user: userRouter,
});

// Export only the type of a router!
// This prevents us from importing server code on the client.
export type AppRouter = typeof appRouter;
