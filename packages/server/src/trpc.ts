import { TRPCError, initTRPC } from "@trpc/server";
import { Context } from "./context";
// You can use any variable name you like.
// We use t to keep things simple.
const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const authorizedProcedure = publicProcedure.use((opts) => {
  if (!opts.ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You are not authorized, please log in and try again.",
    });
  }
  return opts.next();
});
