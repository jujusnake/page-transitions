import { motion, useIsPresent } from "framer-motion";
import { useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Example1 = () => {
  const isPresent = useIsPresent();
  const { pathname, state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (state?.from === "Main") {
      navigate("/1", { replace: true });
    }
  }, []);

  const motionVariable = useMemo(
    () =>
      pathname === "/" || state?.from === "Main"
        ? { initial: { scaleX: 0 } }
        : {
            initial: { scaleX: 1 },
            animate: { scaleX: 0, transition: { duration: 0.5, ease: "circOut" } },
            exit: { scaleX: 1, transition: { duration: 0.5, ease: "circIn" } },
          },
    [pathname, state?.from]
  );

  return (
    <main className="flex flex-col items-center justify-center p-5 min-h-dvh">
      <h1 className="mb-4 text-3xl font-semibold">Example 1</h1>
      <p className="mb-6 text-lg font-medium">Wipe from right to left</p>
      <Link
        to="to"
        className="px-5 py-2 text-sm font-medium text-white transition-colors bg-teal-600 rounded-full shadow-md shadow-teal-700/50 hover:bg-teal-700"
      >
        GO
      </Link>

      <motion.div
        key="example1-from-privacy-screen"
        style={{ originX: isPresent ? 0 : 1 }}
        {...motionVariable}
        className="fixed top-0 bottom-0 left-0 right-0 z-50 bg-teal-500 privacy-screen"
      />
    </main>
  );
};

const Example1To = () => {
  const isPresent = useIsPresent();

  const motionVariable = useMemo(
    () => ({
      initial: { scaleX: 1 },
      animate: { scaleX: 0, transition: { duration: 0.5, ease: "circOut" } },
      exit: { scaleX: 1, transition: { duration: 0.5, ease: "circIn" } },
    }),
    []
  );

  return (
    <main className="flex flex-col items-center justify-center p-5 min-h-dvh">
      <h1 className="mb-4 text-3xl font-semibold">Hi!</h1>
      <motion.div
        key="example1-to-privacy-screen"
        style={{ originX: isPresent ? 0 : 1 }}
        {...motionVariable}
        className="fixed top-0 bottom-0 left-0 right-0 z-50 bg-teal-500"
      />
    </main>
  );
};

export { Example1, Example1To };
