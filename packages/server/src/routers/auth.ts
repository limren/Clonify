import { z } from "zod";
import { authorizedProcedure, publicProcedure, router } from "../trpc";
import { prisma } from "../app";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
import fs from "fs";
import jsonwebtoken from "jsonwebtoken";
export const authRouter = router({
  register: publicProcedure
    .input(
      z.object({
        username: z.string(),
        email: z.string(),
        password: z.string(),
        role: z.enum(["USER", "ARTIST", "ADMIN"]).nullable(),
      })
    )
    .mutation(async (opts) => {
      // const userAlreadyExists = await prisma.user.findUnique({
      //   where: {
      //     email: opts.input.email,
      //   },
      // });
      // if (userAlreadyExists) {
      //   throw new TRPCError({
      //     code: "BAD_REQUEST",
      //     message: "Email already exists.",
      //   });
      // }
      const hashedPassword = await bcrypt.hash(opts.input.password, 10);
      const newUser = await prisma.user.create({
        data: {
          username: opts.input.username,
          email: opts.input.email,
          password: hashedPassword,
          role: opts.input.role || "USER",
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
    .mutation(async (opts) => {
      const user = await prisma.user.findUnique({
        where: {
          email: opts.input.email,
        },
        select: {
          id: true,
          username: true,
          email: true,
          password: true,
          role: true,
        },
      });
      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid email or password.",
        });
      }
      const passwordMatch = await bcrypt.compare(
        opts.input.password,
        user.password
      );
      if (!passwordMatch) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid email or password.",
        });
      }
      // Creation of JWT token
      const secretKey = fs.readFileSync("./src/keys/private.key", "utf8");
      const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };
      const token = jsonwebtoken.sign(payload, secretKey, {
        algorithm: "RS512",
        expiresIn: "5h",
      });
      return {
        user: user,
        token: token,
      };
    }),
  getUser: authorizedProcedure.query(async (opts) => {
    const idPayload = opts.ctx.user?.id;
    if (!idPayload) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User is not authorized.",
      });
    }
    console.log("working until now, id payload: ", idPayload);
    const user = await prisma.user.findUnique({
      where: {
        id: idPayload,
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        profilePath: true,
      },
    });
    return user;
  }),
});
