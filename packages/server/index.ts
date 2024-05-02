import cors from "cors";
import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import * as dotenv from "dotenv";
import { appRouter } from "./src/app";
import { createContext, getUserFromHeader } from "./src/context";
import multer from "multer";
import { PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/playlist");
  },
  filename: function (req, file, cb) {
    const splitArray = file.originalname.split(".");
    const fileExt =
      splitArray.length > 0 ? splitArray[splitArray.length - 1] : "png";
    cb(null, file.fieldname + "-" + Date.now() + "." + fileExt);
  },
});

const playlistUpload = multer({ storage });

dotenv.config();

const app = express();

app.use(cors());

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(8000);

// Handling image uploads

const prisma = new PrismaClient();

app.post(
  "/api/playlist",
  playlistUpload.single("playlistImg"),
  async (req, res, next) => {
    try {
      console.log("file : ", req.file);
      const data = {
        title: req.body.title,
        description: req.body?.description || "",
        path: req.file?.filename || null,
      };
      console.log("req : ", req.body?.description);
      const user = await getUserFromHeader(req, res);
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You need to be authenticated to perform this action.",
        });
      }
      const playlist = await prisma.playlist.create({
        data: {
          title: data.title,
          description: data.description,
          thumbnailPath: data.path,
          User: {
            connect: {
              id: user.id,
            },
          },
        },
        select: {
          id: true,
          title: true,
          description: true,
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
      res.status(200).json(playlist);
    } catch (err) {
      console.log("error :", err);
      res.status(401).json({ error: err });
    }
  }
);

console.log("Server running on http://localhost:8000");

export type AppRouter = typeof appRouter;
