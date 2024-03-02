import cors from "cors";
import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";

import { appRouter } from "./src/app";
import { createContext } from "./src/context";

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

console.log("Server running on http://localhost:8000");

export type AppRouter = typeof appRouter;
