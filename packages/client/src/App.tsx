import React, { useState } from "react";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "../utils/trpc";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Navbar } from "./components/Navbar";
import "./styles/App.css";
const App = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:8000/trpc",
          // You can pass any HTTP headers you wish here
          // async headers() {
          //   return {
          //     authorization: getAuthCookie(),
          //   };
          // },
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
