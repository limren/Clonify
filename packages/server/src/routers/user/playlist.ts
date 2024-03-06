import { z } from "zod";
import { authorizedProcedure, router } from "../../trpc";
import { prisma } from "../../app";
import { TRPCError } from "@trpc/server";
export const playlistRouter = router({
  getPlaylist: authorizedProcedure
    .input(
      z.object({
        playlistId: z.number(),
      })
    )
    .query(async (opts) => {
      const { user } = opts.ctx;
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to view your playlist.",
        });
      }
      const playlist = await prisma.playlist.findUnique({
        where: {
          id: opts.input.playlistId,
          userId: user.id,
        },
        select: {
          id: true,
          title: true,
          Track: {
            select: {
              id: true,
              title: true,
              User: {
                select: {
                  id: true,
                  username: true,
                },
              },
              thumbnailPath: true,
            },
          },
        },
      });
      return playlist;
    }),
  getPlaylists: authorizedProcedure.query(async (opts) => {
    const { user } = opts.ctx;
    if (!user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be logged in to view your playlists.",
      });
    }
    const playlists = await prisma.playlist.findMany({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        title: true,
        Track: {
          select: {
            id: true,
            title: true,
            User: {
              select: {
                id: true,
                username: true,
              },
            },
            thumbnailPath: true,
          },
        },
      },
    });
    return playlists;
  }),
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
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "You must be logged in to create a playlist.",
          });
        }
        const playlist = await prisma.playlist.create({
          data: {
            title: opts.input.title,
            User: {
              connect: {
                id: user.id,
              },
            },
          },
          select: {
            id: true,
            title: true,
            Track: {
              select: {
                id: true,
                title: true,
                User: {
                  select: {
                    id: true,
                    username: true,
                  },
                },
                thumbnailPath: true,
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
  delete: authorizedProcedure
    .input(
      z.object({
        playlistId: z.number(),
      })
    )
    .mutation(async (opts) => {
      const { user } = opts.ctx;
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to delete a playlist.",
        });
      }
      const playlist = await prisma.playlist.delete({
        where: {
          id: opts.input.playlistId,
          userId: user.id,
        },
      });
      return playlist;
    }),
  addTrack: authorizedProcedure
    .input(
      z.object({
        trackId: z.number(),
        playlistId: z.number(),
      })
    )
    .mutation(async (opts) => {
      const { user } = opts.ctx;
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to add a track to a playlist.",
        });
      }
      const playlist = await prisma.playlist.update({
        where: {
          id: opts.input.playlistId,
          userId: user.id,
        },
        data: {
          Track: {
            connect: {
              id: opts.input.trackId,
            },
          },
        },
      });
      return playlist;
    }),
  deleteTrack: authorizedProcedure
    .input(
      z.object({
        playlistId: z.number(),
        trackId: z.number(),
      })
    )
    .mutation(async (opts) => {
      const { user } = opts.ctx;
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to delete a track from a playlist.",
        });
      }
      const playlist = await prisma.playlist.update({
        where: {
          id: opts.input.playlistId,
          userId: user.id,
        },
        data: {
          Track: {
            disconnect: {
              id: opts.input.trackId,
            },
          },
        },
      });
      return playlist;
    }),
  updateTitle: authorizedProcedure
    .input(
      z.object({
        playlistId: z.number(),
        newTitle: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { user } = opts.ctx;
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to update a playlist.",
        });
      }
      const playlist = await prisma.playlist.update({
        where: {
          id: opts.input.playlistId,
          userId: user.id,
        },
        data: {
          title: opts.input.newTitle,
        },
        select: {
          id: true,
          title: true,
          Track: {
            select: {
              id: true,
              title: true,
              User: {
                select: {
                  id: true,
                  username: true,
                },
              },
              thumbnailPath: true,
            },
          },
        },
      });
      return playlist;
    }),
  getRandomPlaylist: authorizedProcedure.query(async (opts) => {
    const { user } = opts.ctx;
    if (!user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be logged in to view your playlist of the day.",
      });
    }
    const playlists = await prisma.user.findMany({
      where: {
        id: user.id,
      },
    });
    if (playlists.length === 0) {
      return {};
    }
    // Getting a random playlist from the user's playlists
    const randomNb = Math.floor(Math.random() * playlists.length);
    return playlists[randomNb];
  }),
});
