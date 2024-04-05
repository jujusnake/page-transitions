import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useMemo } from "react";

const Example3 = () => {
  const { pathname, state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (state?.from === "Main") {
      navigate("/3", { replace: true });
    }
  }, []);

  const isDisabled = useMemo(() => state?.from === "Main", [state?.from]);

  return (
    <main className="flex flex-col items-center justify-center p-5 min-h-dvh">
      <h1 className="mb-4 text-3xl font-semibold">Example 3</h1>
      <p className="mb-6 text-lg font-medium">Bottom to top slide + Blob effect</p>
      <Link
        to="to"
        className="px-5 py-2 text-sm font-medium text-white transition-colors bg-yellow-300 rounded-full shadow-md shadow-yellow-400/50 hover:bg-yellow-400"
      >
        GO
      </Link>

      {pathname !== "/" && (
        <motion.div
          className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-yellow-300"
          initial={isDisabled ? false : { y: 0 }}
          animate={{ y: "100%", transition: { type: "spring", bounce: 0, duration: 0.5, delay: 0.2 } }}
          exit={{ y: 0, transition: { type: "spring", bounce: 0, duration: 0.5, delay: 0.2 } }}
        >
          <motion.div
            initial={isDisabled ? false : { height: "10vh" }}
            animate={{ height: 0, transition: { type: "spring", bounce: 0, duration: 0.7, delay: 0.5 } }}
            exit={{ height: "10vh", transition: { type: "spring", stiffness: 200 } }}
            className="absolute bottom-full h-[10vh] w-full overflow-hidden"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[750%] w-[150%] rounded-[50%] bg-yellow-300" />
          </motion.div>

          <motion.div
            className="text-4xl font-semibold"
            initial={isDisabled ? false : { y: 0, opacity: 1 }}
            animate={{ y: [0, 0, "100%"], opacity: [1, 0.5, 0], transition: { duration: 0.35, times: [0, 0.5, 1] } }}
            exit={{ y: 0, opacity: 1, transition: { duration: 0.3, delay: 0.35 } }}
          >
            Transitioning!
          </motion.div>
        </motion.div>
      )}
    </main>
  );
};

const Example3To = () => {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col items-center justify-center p-5 min-h-dvh">
      <h1 className="mb-4 text-3xl font-semibold">Arrived!</h1>
      <p className="mb-6 text-lg font-medium">Wanna go back?</p>
      <button
        onClick={() => navigate(-1)}
        className="px-5 py-2 text-sm font-medium text-white transition-colors bg-yellow-300 rounded-full shadow-md shadow-yellow-400/50 hover:bg-yellow-400"
      >
        Back
      </button>

      <motion.div
        className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-yellow-300"
        initial={{ y: 0 }}
        animate={{ y: "-100%", transition: { type: "spring", bounce: 0, duration: 0.5, delay: 0.2 } }}
        exit={{ y: 0, transition: { type: "spring", bounce: 0, duration: 0.5, delay: 0.2 } }}
      >
        <motion.div
          className="text-4xl font-semibold"
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: [0, 0, "-100%"], opacity: [1, 0.5, 0], transition: { duration: 0.35, times: [0, 0.5, 1] } }}
          exit={{ y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.35 } }}
        >
          Transitioning!
        </motion.div>

        <motion.div
          className="absolute top-full h-[10vh] w-full overflow-hidden"
          initial={{ height: "10vh" }}
          animate={{ height: 0, transition: { type: "spring", bounce: 0, duration: 0.7, delay: 0.5 } }}
          exit={{ height: "10vh", transition: { type: "spring", stiffness: 200 } }}
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[750%] w-[150%] rounded-[50%] bg-yellow-300" />
        </motion.div>
      </motion.div>
    </main>
  );
};

export { Example3, Example3To };
