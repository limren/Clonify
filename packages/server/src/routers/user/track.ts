import { TRPCError } from "@trpc/server";
import { authorizedProcedure, router } from "../../trpc";
import { prisma } from "../../app";
import { z } from "zod";

async function checkIfUserLikedTrack(
  userId: number,
  trackId: number
): Promise<boolean> {
  try {
    // Retrieve the user with their liked tracks
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { likedTracks: { where: { id: trackId } } },
    });

    return (
      !!user && user.likedTracks.some((likedTrack) => likedTrack.id === trackId)
    );
  } catch (error) {
    return false;
  }
}

export const trackRouter = router({
  getTrack: authorizedProcedure
    .input(
      z.object({
        trackId: z.number().nullable(),
      })
    )
    .query(async (opts) => {
      const { user } = opts.ctx;
      const { trackId } = opts.input;
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to view new releases.",
        });
      }
      if (!trackId) {
        return null;
      }
      const track = await prisma.track.findUnique({
        where: {
          id: trackId,
        },
        select: {
          id: true,
          thumbnailPath: true,
          title: true,
          minutes: true,
          seconds: true,
          User: {
            select: {
              username: true,
            },
          },
        },
      });
      const isLiked = await checkIfUserLikedTrack(user.id, trackId);
      if (!track) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "The requested song doesn't exist in the database.",
        });
      }

      return { ...track, isLiked: isLiked };
    }),
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
  toggleLikeTrack: authorizedProcedure
    .input(
      z.object({
        trackId: z.number(),
      })
    )
    .mutation(async (opts) => {
      const { user } = opts.ctx;
      const { trackId } = opts.input;
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to like a track.",
        });
      }
      const userLikedTrack = await prisma.user.findUnique({
        where: { id: user.id },
        include: { likedTracks: { where: { id: trackId } } },
      });
      if (userLikedTrack && userLikedTrack.likedTracks.length > 0) {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            likedTracks: {
              disconnect: { id: trackId },
            },
          },
        });
        return false;
      } else {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            likedTracks: {
              connect: { id: trackId },
            },
          },
        });
        return true;
      }
    }),
  getLikedTracks: authorizedProcedure.query(async (opts) => {
    const { user } = opts.ctx;

    const likedTracks = await prisma.user.findUnique({
      where: {
        id: user?.id,
      },
      select: {
        likedTracks: {
          select: {
            title: true,
            minutes: true,
            seconds: true,
            timesListened: true,
            year: true,
            thumbnailPath: true,
            trackPath: true,
            User: {
              select: {
                username: true,
              },
            },
            Album: {
              select: {
                title: true,
              },
            },
          },
        },
      },
    });
    return likedTracks;
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
