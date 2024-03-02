import React, { useState } from "react";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "../utils/trpc";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Navbar } from "./components/Navbar";
import { getAuthToken } from "../utils/token";
import "./styles/App.css";
const App = ({ children }: { children: React.ReactNode }) => {
  // const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [queryClient] = useState(
    () =>
      new QueryClient({
        // Settings for all queries, this config might be modified in others pages
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:8000/trpc",
          async headers() {
            return {
              authorization: `Bearer ${getAuthToken()}`,
            };
          },
        }),
      ],
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <Navbar />
          {children}
        </div>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default App;
