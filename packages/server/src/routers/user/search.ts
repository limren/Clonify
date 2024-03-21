import { z } from "zod";
import { authorizedProcedure, router } from "../../trpc";
import { prisma } from "../../app";

export const searchRouter = router({
  searchBy: authorizedProcedure
    .input(
      z.object({
        query: z.string(),
      })
    )
    .query(async (opts) => {
      const playlists = await prisma.playlist.findMany({
        where: {
          title: {
            contains: opts.input.query,
          },
        },
      });
      const albums = await prisma.album.findMany({
        where: {
          title: {
            contains: opts.input.query,
          },
        },
      });
      const artists = await prisma.user.findMany({
        where: {
          username: {
            contains: opts.input.query,
          },
          role: "ARTIST",
        },
      });
      return {
        playlists: playlists,
        albums: albums,
        artists: artists,
      };
    }),
});
