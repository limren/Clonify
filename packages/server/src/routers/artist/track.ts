import { z } from "zod";
import { artistProcedure, router } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { prisma } from "../../app";

export const trackRouter = router({
  create: artistProcedure
    .input(
      z.object({
        title: z.string(),
        duration: z.number(),
        year: z.number(),
      })
    )
    .mutation(async (opts) => {
      const { user } = opts.ctx;
      const { title, duration, year } = opts.input;
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in as an artist to create a track.",
        });
      }
      const newTrack = await prisma.track.create({
        data: {
          title: title,
          duration: duration,
          year: year,
          User: {
            connect: {
              id: user.id,
            },
          },
        },
      });
      return newTrack;
    }),
});
