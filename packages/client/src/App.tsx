import { useState } from "react";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "../utils/trpc";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Navbar } from "./components/Navbar";
import { Album } from "./pages/Album";
import "./styles/App.css";
function App() {
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
          <Album />
        </div>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
