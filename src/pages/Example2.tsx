import { motion, useAnimate } from "framer-motion";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Example2 = () => {
  return (
    <main className="flex flex-col items-center justify-center p-5 min-h-dvh">
      <h1 className="mb-4 text-3xl font-semibold">Example 2</h1>
      <p className="mb-6 text-lg font-medium">Double wipe from right to left with logo and a loader</p>
      <Link
        to="to"
        className="px-5 py-2 text-sm font-medium text-white transition-colors bg-pink-600 rounded-full shadow-md shadow-pink-700/50 hover:bg-pink-700"
      >
        GO
      </Link>

      <motion.div
        key="example2-from"
        initial={{ x: 0 }}
        animate={{
          x: "100%",
          transition: {
            type: "tween",
            duration: 0.5,
            ease: "circIn",
            delay: 0.8,
          },
        }}
        exit={{ x: 0, transition: { type: "tween", duration: 0.5, ease: "circIn" } }}
        className="fixed top-0 bottom-0 left-0 right-0 z-10 bg-pink-500"
      />

      <div className="fixed z-20 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <div className="flex overflow-hidden text-3xl font-semibold text-white">
          {["L", "O", "G", "O"].map((letter, index) => (
            <motion.div
              key={`example2-logo-child-${index + 1}`}
              initial={{ y: 0 }}
              animate={{
                y: "-100%",
                transition: {
                  type: "tween",
                  ease: "circIn",
                  duration: 0.3,
                  delay: 0.1 * index,
                },
              }}
              exit={{
                y: 0,
                transition: {
                  type: "tween",
                  ease: "circOut",
                  duration: 0.3,
                  delay: 0.5 + 0.1 * index,
                },
              }}
            >
              {letter}
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
};

const Example2To = () => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const timer = setTimeout(() => {
      animate(
        scope.current,
        {
          x: "-100%",
        },
        { type: "tween", duration: 0.5, ease: "circIn" }
      );
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex flex-col items-center justify-center p-5 min-h-dvh">
      IV Viewer ✨
      <div className="fixed z-20 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <div className="flex overflow-hidden text-3xl font-semibold text-white">
          {["L", "O", "G", "O"].map((letter, index) => (
            <motion.div
              key={`example2-logo-child-${index + 1}`}
              initial={{ y: 0 }}
              animate={{
                y: "100%",
                transition: {
                  type: "tween",
                  ease: "circIn",
                  duration: 0.3,
                  delay: 0.1 * index,
                },
              }}
              exit={{
                y: 0,
                transition: {
                  type: "tween",
                  ease: "circOut",
                  duration: 0.3,
                  delay: 0.3 + 0.1 * index,
                },
              }}
            >
              {letter}
            </motion.div>
          ))}
        </div>
      </div>
      <motion.div
        key="example2-to"
        initial={{ x: 0 }}
        animate={{ x: "-100%", transition: { type: "tween", duration: 0.5, ease: "circIn", delay: 0.4 } }}
        exit={{ x: 0, transition: { type: "tween", duration: 0.5, ease: "circIn" } }}
        className="fixed top-0 bottom-0 left-0 right-0 z-10 bg-pink-500"
      />
      <motion.div
        ref={scope}
        key="example2-to-2"
        initial={{ x: "100%" }}
        animate={{ x: 0, transition: { type: "tween", duration: 0.5, ease: "circIn", delay: 0.4 } }}
        exit={{ x: "0", transition: { type: "tween", duration: 0.5, ease: "circIn" } }}
        className="fixed top-0 bottom-0 left-0 right-0 z-0 flex items-center justify-center bg-gray-500"
      >
        <div className="text-2xl font-semibold text-white animate-pulse">Loading...</div>
      </motion.div>
    </main>
  );
};

export { Example2, Example2To };
