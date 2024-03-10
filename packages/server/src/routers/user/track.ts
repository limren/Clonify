import { TRPCError } from "@trpc/server";
import { authorizedProcedure, router } from "../../trpc";
import { prisma } from "../../app";

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
});
