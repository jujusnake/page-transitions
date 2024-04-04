import { AnimatePresence } from "framer-motion";
import { cloneElement } from "react";
import { useLocation, useRoutes } from "react-router-dom";
import Main from "./pages/Main";
import { Example1, Example1To } from "./pages/Example1";
import Example2 from "./pages/Example2";

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
    { path: "/2", element: <Example2 /> },
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
