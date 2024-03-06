import { mergeRouters } from "@trpc/server/unstable-core-do-not-import";
import { router } from "../../trpc";
import { trackRouter } from "./track";
import { albumRouter } from "./album";

export const artistRouter = mergeRouters(trackRouter, albumRouter);
