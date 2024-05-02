import { TRPCError } from "@trpc/server";
import { authorizedProcedure, publicProcedure, router } from "../../trpc";
import { prisma } from "../../app";
import { z } from "zod";

type Artist = {
  id: number;
  username: string;
  email: string;
  profilePath: string | null;
};

export const artistRouter = router({
  likeArtist: authorizedProcedure
    .input(
      z.object({
        artistId: z.number(),
      })
    )
    .mutation(async (opts) => {
      const { user } = opts.ctx;
      const { artistId } = opts.input;
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to like an artist.",
        });
      }
      const hasLikedArtist = await prisma.user.findFirst({
        where: {
          likedArtists: {
            some: {
              id: artistId,
            },
          },
        },
      });
      if (!hasLikedArtist) {
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            likedArtists: {
              connect: {
                id: artistId,
              },
            },
          },
        });
      } else {
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            likedArtists: {
              disconnect: {
                id: artistId,
              },
            },
          },
        });
      }
      return true;
    }),
  getArtists: authorizedProcedure.query(async (opts) => {
    const { user } = opts.ctx;
    if (!user) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You need to be authenticated to view artists",
      });
    }
    const myStats = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        likedArtists: true,
      },
    });
    if (!myStats) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message:
          "An issue occurred while retrieving your data. Please try again later.",
      });
    }
    const myArtists = myStats.likedArtists;
    const artists = await prisma.user.findMany({
      where: {
        role: "ARTIST",
      },
      select: {
        id: true,
        username: true,
        email: true,
        profilePath: true,
      },
    });
    const myArtistsIds = [...myArtists].map((artist) => artist.id);
    artists.reduce((acc: Artist[], artist: Artist) => {
      if (myArtistsIds.includes(artist.id)) {
        acc.push({ ...artist });
      }
      return acc;
    }, []);
    console.log("artists :", artists);
    return artists;
  }),
});
