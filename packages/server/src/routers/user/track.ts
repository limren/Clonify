import { TRPCError } from "@trpc/server";
import { authorizedProcedure, router } from "../../trpc";
import { prisma } from "../../app";
import { z } from "zod";

export const trackRouter = router({
  getNewReleases: authorizedProcedure.query(async (opts) => {
    const { user } = opts.ctx;
    if (!user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be logged in to view new releases.",
      });
    }
    const newReleases = await prisma.track.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
      select: {
        id: true,
        title: true,
        User: {
          select: {
            id: true,
            username: true,
          },
        },
        Album: {
          select: {
            title: true,
          },
        },
        minutes: true,
        seconds: true,
        year: true,
        thumbnailPath: true,
        trackPath: true,
      },
    });
    return newReleases;
  }),
  likeTrack: authorizedProcedure
    .input(
      z.object({
        trackId: z.number(),
      })
    )
    .mutation(async (opts) => {
      try {
        const { user } = opts.ctx;
        const { trackId } = opts.input;
        if (!user) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "You must be logged in to like a track.",
          });
        }
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            likedTracks: {
              connect: {
                id: trackId,
              },
            },
          },
        });
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    }),
  addTrackToPlaylist: authorizedProcedure
    .input(
      z.object({
        trackId: z.number(),
        playlistId: z.number(),
      })
    )
    .mutation(async (opts) => {
      const { user } = opts.ctx;
      const { trackId, playlistId } = opts.input;

      const updatedData = await prisma.playlist.update({
        where: {
          id: playlistId,
          userId: user?.id,
        },
        data: {
          Track: {
            connect: {
              id: trackId,
            },
          },
        },
      });
      return updatedData;
    }),
  removeTrackPlaylist: authorizedProcedure
    .input(
      z.object({
        trackId: z.number(),
        playlistId: z.number(),
      })
    )
    .mutation(async (opts) => {
      const { user } = opts.ctx;
      const { trackId, playlistId } = opts.input;
      const updatedData = await prisma.playlist.update({
        where: {
          id: playlistId,
          userId: user?.id,
        },
        data: {
          Track: {
            disconnect: {
              id: trackId,
            },
          },
        },
      });
      return updatedData;
    }),
  addTrackListener: authorizedProcedure
    .input(
      z.object({
        trackId: z.number(),
      })
    )
    .mutation(async (opts) => {
      const { trackId } = opts.input;
      const currentTrack = await prisma.track.findUnique({
        where: {
          id: trackId,
        },
        select: {
          timesListened: true,
        },
      });
      if (!currentTrack) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "The ID doesn't match any track.",
        });
      }
      const changedTrack = await prisma.track.update({
        where: {
          id: trackId,
        },
        data: {
          timesListened: currentTrack.timesListened + 1,
        },
      });
      return changedTrack;
    }),
});
