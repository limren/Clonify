import { publicProcedure, router } from "./trpc";
import { authRouter } from "./routers/auth";
import { PrismaClient } from "@prisma/client";
import { artistRouter } from "./routers/artist/artist";

export const prisma = new PrismaClient();

export const appRouter = router({
  auth: authRouter,
  artist: artistRouter,
});

export type AppRouter = typeof appRouter;
