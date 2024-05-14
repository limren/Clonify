import cors from "cors";
import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import * as dotenv from "dotenv";
import { appRouter } from "./src/app";
import { createContext, getUserFromHeader } from "./src/context";
import multer from "multer";
import { PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import {
  storagePlaylist,
  storageTrack,
  storageAlbum,
} from "./src/utils/storage";

const playlistUpload = multer({ storage: storagePlaylist });
const trackUpload = multer({ storage: storageTrack });
const albumUpload = multer({ storage: storageAlbum });

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

app.use("/uploads", express.static("uploads"));

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
app.post(
  "/api/album",
  albumUpload.single("albumImg"),
  async (req, res, next) => {
    try {
      console.log("file : ", req.file);
      const data = {
        title: req.body.title,
        year: parseInt(req.body?.year) || 0,
        thumbnailPath: req.file?.filename || null,
      };
      const user = await getUserFromHeader(req, res);
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You need to be authenticated to perform this action.",
        });
      }
      const album = await prisma.album.create({
        data: {
          ...data,
          User: {
            connect: {
              id: user.id,
            },
          },
        },
      });
      res.status(200).json(album);
    } catch (err) {
      console.log("error :", err);
      res.status(401).json({ error: err });
    }
  }
);
app.post(
  "/api/track",
  trackUpload.single("trackImg"),
  async (req, res, next) => {
    try {
      const data = {
        title: req.body.title,
        minutes: parseInt(req.body.minutes),
        seconds: parseInt(req.body.seconds),
        year: parseInt(req.body.year),
        thumbnailPath: req.file?.filename || null,
      };
      const user = await getUserFromHeader(req, res);
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You need to be authenticated to perform this action.",
        });
      }
      const track = await prisma.track.create({
        data: {
          ...data,
          User: {
            connect: {
              id: user.id,
            },
          },
        },
      });

      res.status(200).json(track);
    } catch (err) {
      console.log("error :", err);
      res.status(401).json({ error: err });
    }
  }
);

console.log("Server running on http://localhost:8000");

export type AppRouter = typeof appRouter;
