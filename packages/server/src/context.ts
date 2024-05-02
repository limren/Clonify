import { decodeAndVerifyJwtToken } from "./utils/auth";
import * as trpcExpress from "@trpc/server/adapters/express";

// #TODO : correct the types of req & res : trpcExpress.CreateExpressContextOptions || Check express doc
export  async function getUserFromHeader(req:any, res:any) {
  if (req.headers.authorization) {
    const user = await decodeAndVerifyJwtToken(
      req.headers.authorization.split(" ")[1]
    );
    return user;
  }
  return null;
}

export async function createContext({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) {
  const user = await getUserFromHeader(req, res);
  return {
    user,
  };
}
export type Context = Awaited<ReturnType<typeof createContext>>;
