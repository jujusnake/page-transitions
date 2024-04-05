import { AnimatePresence } from "framer-motion";
import { cloneElement } from "react";
import { useLocation, useRoutes } from "react-router-dom";
import Main from "./pages/Main";
import { Example1, Example1To } from "./pages/Example1";
import { Example2, Example2To } from "./pages/Example2";
import { Example3, Example3To } from "./pages/Example3";

const App = () => {
  const element = useRoutes([
    { path: "/", element: <Main /> },
    {
      path: "/1",
      children: [
        { index: true, element: <Example1 /> },
        { path: "to", element: <Example1To /> },
      ],
    },
    {
      path: "/2",
      children: [
        { index: true, element: <Example2 /> },
        { path: "to", element: <Example2To /> },
      ],
    },
    {
      path: "/3",
      children: [
        { index: true, element: <Example3 /> },
        { path: "to", element: <Example3To /> },
      ],
    },
  ]);

  const location = useLocation();

  if (!element) return null;

  return (
    <AnimatePresence mode="wait" initial={false}>
      {cloneElement(element, { key: location.pathname })}
    </AnimatePresence>
  );
};

export default App;
