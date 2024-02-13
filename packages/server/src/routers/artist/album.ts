import { z } from "zod";
import { artistProcedure, router } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { prisma } from "../../app";

export const albumArtistRouter = router({
  create: artistProcedure
    .input(
      z.object({
        title: z.string(),
        year: z.number(),
      })
    )
    .mutation(async (opts) => {
      const { user } = opts.ctx;
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged as an artist in to create an album.",
        });
      }
      const newAlbum = await prisma.album.create({
        data: {
          title: opts.input.title,
          year: opts.input.year,
          User: {
            connect: {
              id: user.id,
            },
          },
        },
      });
      return newAlbum;
    }),
  addTrackAlbum: artistProcedure
    .input(
      z.object({
        albumId: z.number(),
        trackId: z.number(),
      })
    )
    .mutation(async (opts) => {
      const { user } = opts.ctx;
      const { albumId, trackId } = opts.input;
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message:
            "You must be logged as an artist in to add a track to an album.",
        });
      }
      const album = await prisma.album.update({
        where: {
          id: albumId,
        },
        data: {
          Track: {
            connect: {
              id: trackId,
            },
          },
        },
        select: {
          id: true,
          title: true,
          year: true,
          thumbnailPath: true,
          Track: {
            select: {
              id: true,
              title: true,
              thumbnailPath: true,
              User: {
                select: {
                  id: true,
                  username: true,
                },
              },
            },
          },
        },
      });
      return album;
    }),
  deleteTrackAblum: artistProcedure
    .input(
      z.object({
        albumId: z.number(),
        trackId: z.number(),
      })
    )
    .mutation(async (opts) => {
      const { user } = opts.ctx;
      const { albumId, trackId } = opts.input;
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to delete a track from an album.",
        });
      }
      const album = await prisma.album.update({
        where: {
          id: albumId,
        },
        data: {
          Track: {
            disconnect: {
              id: trackId,
            },
          },
        },
        select: {
          id: true,
          title: true,
          year: true,
          thumbnailPath: true,
          Track: {
            select: {
              id: true,
              title: true,
              thumbnailPath: true,
              User: {
                select: {
                  id: true,
                  username: true,
                },
              },
            },
          },
        },
      });
      return album;
    }),
  delete: artistProcedure
    .input(
      z.object({
        albumId: z.number(),
      })
    )
    .mutation(async (opts) => {
      const { user } = opts.ctx;
      const { albumId } = opts.input;
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged as an artist in to delete an album.",
        });
      }
      const album = await prisma.album.delete({
        where: {
          id: albumId,
          artistId: user.id,
        },
      });
      return album;
    }),
});
