import ReactDOM from "react-dom/client";
import { Global, ThemeProvider } from "@emotion/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { theme } from "libs/palette";
import { reset } from "styles/reset";
import Routes from "routes";
import { COMMENT_KEY, CONTENTS_KEY } from "constants/query_key";

const rootElement = document.getElementById("wrap");
if (!rootElement) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(rootElement);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 2 // 2분간 fresh 상태 (2분간은 refetch 안함)
    }
  }
});
root.render(
  <>
    <Global styles={reset} />
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </QueryClientProvider>
  </>
);
