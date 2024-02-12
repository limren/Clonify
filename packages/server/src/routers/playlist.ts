import { object, z } from "zod";
import { authorizedProcedure, router } from "../trpc";
import { prisma } from "../app";
import { TRPCError } from "@trpc/server";
export const playlistRouter = router({
  create: authorizedProcedure
    .input(
      z.object({
        title: z.string(),
      })
    )
    .query(async (opts) => {
      try {
        const { user } = opts.ctx;
        if (!user) {
          throw new Error("User not found");
        }
        const playlist = await prisma.playlist.create({
          data: {
            title: opts.input.title,
            userId: user.id,
            User: {
              connect: {
                id: user.id,
              },
            },
          },
        });
        return playlist;
      } catch (e) {
        console.error(e);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            "An error occurred while creating the playlist. Please try again later.",
        });
      }
    }),
});
