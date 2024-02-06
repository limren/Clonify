import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { prisma } from "../app";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
export const userRouter = router({
  register: publicProcedure
    .input(
      z.object({
        username: z.string(),
        email: z.string(),
        password: z.string(),
      })
    )
    .query(async (opts) => {
      const userAlreadyExists = await prisma.user.findUnique({
        where: {
          email: opts.input.email,
        },
      });
      if (userAlreadyExists) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Email already exists.",
        });
      }
      const hashedPassword = await bcrypt.hash(opts.input.password, 10);
      const newUser = await prisma.user.create({
        data: {
          username: opts.input.username,
          email: opts.input.email,
          password: hashedPassword,
        },
        select: {
          id: true,
          username: true,
          email: true,
          Playlist: true,
        },
      });
      if (!newUser) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "An error occurred while creating the user. Please try again later.",
        });
      }
      return newUser;
    }),
  login: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      })
    )
    .query(async (opts) => {}),
});
