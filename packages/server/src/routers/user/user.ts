import { mergeRouters } from "@trpc/server/unstable-core-do-not-import";
import { trackRouter } from "./track";
import { playlistRouter } from "./playlist";

export const userRouter = mergeRouters(trackRouter, playlistRouter);
