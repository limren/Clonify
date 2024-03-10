import React, { useState } from "react";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "../utils/trpc";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Sidebar } from "./components/Sidebar";
import { getAuthToken } from "../utils/token";
import "./styles/App.css";
import { MusicPlayer } from "./components/MusicPlayer";
import { Navbar } from "./components/Navbar";
import { PopUpPlaylist } from "./components/PopUpPlaylist";
const App = ({ children }: { children: React.ReactNode }) => {
  const [popUpOpen, setPopUpOpen] = React.useState(false);
  const [queryClient] = useState(
    () =>
      new QueryClient({
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
          {popUpOpen && <PopUpPlaylist setPopUpOpen={setPopUpOpen} />}
          <main>
            <Sidebar setPopUpOpen={setPopUpOpen} />
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
