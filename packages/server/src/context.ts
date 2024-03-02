import { decodeAndVerifyJwtToken } from "./utils/auth";
import * as trpcExpress from "@trpc/server/adapters/express";
export async function createContext({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) {
  async function getUserFromHeader() {
    if (req.headers.authorization) {
      const user = await decodeAndVerifyJwtToken(
        req.headers.authorization.split(" ")[1]
      );
      return user;
    }
    return null;
  }
  const user = await getUserFromHeader();
  return {
    user,
  };
}
export type Context = Awaited<ReturnType<typeof createContext>>;
