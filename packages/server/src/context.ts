import { initTRPC } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
export const createContext = async (opts: CreateNextContextOptions) => {
  return {};
};
const t = initTRPC.context<typeof createContext>().create();
