import { RouterProvider } from "react-router";
import router from "./router/router";
import { Provider as ReduxProvider } from "react-redux";
import store from "./utils/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReduxProvider store={store}>
          <RouterProvider router={router} />
        </ReduxProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
