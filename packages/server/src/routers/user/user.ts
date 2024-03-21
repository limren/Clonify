import { mergeRouters } from "@trpc/server/unstable-core-do-not-import";
import { trackRouter } from "./track";
import { playlistRouter } from "./playlist";
import { artistRouter } from "./artist";
import { searchRouter } from "./search";

export const userRouter = mergeRouters(
  trackRouter,
  playlistRouter,
  artistRouter,
  searchRouter
);
