import { createBrowserRouter } from "react-router";
import routes from "./routes.tsx";

const BE = import.meta.env;
const githubBuild = BE["VITE_BUILD_TARGET"];

const router = createBrowserRouter(routes, {
  basename: githubBuild ? "/cms-app" : undefined,
});

export default router;
