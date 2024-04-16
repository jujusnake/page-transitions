import { Route, Routes, useLocation } from "react-router-dom";
import Main from "./pages/Main";
import { Example1, Example1To } from "./pages/Example1";
import { Example2, Example2To } from "./pages/Example2";
import { Example3, Example3To } from "./pages/Example3";
import WaitLayout from "./layout/WaitLayout";
import WireframeMain from "./pages/wireframe/WireframeMain";
import WireframeViewer from "./pages/wireframe/WireframeViewer";

// const App = () => {
//   const element = useRoutes([
//     { path: "/", element: <Main /> },
//     {
//       path: "/1",
//       children: [
//         { index: true, element: <Example1 /> },
//         { path: "to", element: <Example1To /> },
//       ],
//     },
//     {
//       path: "/2",
//       children: [
//         { index: true, element: <Example2 /> },
//         { path: "to", element: <Example2To /> },
//       ],
//     },
//     {
//       path: "/3",
//       children: [
//         { index: true, element: <Example3 /> },
//         { path: "to", element: <Example3To /> },
//       ],
//     },
//     {
//       path: "/4",
//       children: [
//         { index: true, element: <Example4 /> },
//         { path: "to", element: <Example4To /> },
//       ],
//     },
//   ]);

//   const location = useLocation();

//   if (!element) return null;

//   return (
//     <AnimatePresence mode="popLayout" initial={false}>
//       {cloneElement(element, { key: location.pathname })}
//     </AnimatePresence>
//   );
// };

// export default App;

const App = () => {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route
        path="/1/*"
        element={
          <WaitLayout>
            <Routes location={location} key={location.pathname}>
              <Route index element={<Example1 />} />
              <Route path="to" element={<Example1To />} />
            </Routes>
          </WaitLayout>
        }
      />
      <Route
        path="/2/*"
        element={
          <WaitLayout>
            <Routes location={location} key={location.pathname}>
              <Route index element={<Example2 />} />
              <Route path="to" element={<Example2To />} />
            </Routes>
          </WaitLayout>
        }
      />
      <Route
        path="/3/*"
        element={
          <WaitLayout>
            <Routes location={location} key={location.pathname}>
              <Route index element={<Example3 />} />
              <Route path="to" element={<Example3To />} />
            </Routes>
          </WaitLayout>
        }
      />
      <Route
        path="/wireframe/*"
        element={
          <WaitLayout>
            <Routes location={location} key={location.pathname}>
              <Route index element={<WireframeMain />} />
              <Route path="/card">
                <Route path="1" element={<WireframeViewer cardNum={1} />} />
                <Route path="2" element={<WireframeViewer cardNum={2} />} />
                <Route path="3" element={<WireframeViewer cardNum={3} />} />
              </Route>
            </Routes>
          </WaitLayout>
        }
      />
    </Routes>
  );
};

export default App;
