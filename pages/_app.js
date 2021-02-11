import "../styles/tailwind.css";
import "../styles/globals.css";
import { QueryClientProvider, QueryClient } from "react-query";

const client = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <div className="antialiased">
      <QueryClientProvider client={client}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </div>
  );
}

export default MyApp;
