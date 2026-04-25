import { createHashRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Projects } from "./pages/Projects";
import { AISystems } from "./pages/AISystems";
import { Resume } from "./pages/Resume";
import { Contact } from "./pages/Contact";

export const router = createHashRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "projects", Component: Projects },
      { path: "ai-systems", Component: AISystems },
      { path: "resume", Component: Resume },
      { path: "contact", Component: Contact },
    ],
  },
]);
