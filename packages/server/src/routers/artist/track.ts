import { z } from "zod";
import { artistProcedure, router } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { prisma } from "../../app";

export const trackRouter = router({
  createTrack: artistProcedure
    .input(
      z.object({
        title: z.string(),
        minutes: z.number(),
        seconds: z.number(),
        year: z.number(),
      })
    )
    .mutation(async (opts) => {
      const { user } = opts.ctx;
      const { title, minutes, seconds, year } = opts.input;
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in as an artist to create a track.",
        });
      }
      const newTrack = await prisma.track.create({
        data: {
          title: title,
          minutes: minutes,
          seconds: seconds,
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
  deleteTrack: artistProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async (opts) => {
      const { user } = opts.ctx;
      const { id } = opts.input;
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in as an artist to delete a track.",
        });
      }
      const track = await prisma.track.delete({
        where: {
          id: id,
          // Must be the owner of the track to delete it
          User: {
            id: user.id,
          },
        },
      });
      return track;
    }),
});
