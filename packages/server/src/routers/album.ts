import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { prisma } from "../app";

export const albumRouter = router({
  getAlbum: publicProcedure
    .input(
      z.object({
        albumId: z.number(),
      })
    )
    .query(async (opts) => {
      const { albumId } = opts.input;
      const album = await prisma.album.findUnique({
        where: {
          id: albumId,
        },
        select: {
          id: true,
          title: true,
          User: {
            select: {
              id: true,
              username: true,
            },
          },
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
            },
          },
        },
      });
      return album;
    }),
  getAlbums: publicProcedure
    .input(
      z.object({
        artistId: z.number(),
      })
    )
    .query(async (opts) => {
      const { artistId } = opts.input;
      const albums = await prisma.album.findMany({
        where: {
          artistId: artistId,
        },
        select: {
          id: true,
          title: true,
          User: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      });
      return albums;
    }),
});
