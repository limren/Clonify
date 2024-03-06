import React, { useState } from "react";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "../utils/trpc";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Sidebar } from "./components/Sidebar";
import { getAuthToken } from "../utils/token";
import "./styles/App.css";
import { MusicPlayer } from "./components/MusicPlayer";
import { Navbar } from "./components/Navbar";
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
        <section className="App">
          <main>
            <Sidebar />
            <section>
              <Navbar />
              {children}
            </section>
          </main>
          <footer>
            <MusicPlayer />
          </footer>
        </section>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default App;
