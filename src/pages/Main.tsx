import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <motion.main key="main" className="flex flex-col items-center justify-center p-5 min-h-dvh">
      <h1 className="mb-4 text-3xl font-semibold">React Router Transitions</h1>
      <p className="mb-1 text-lg font-medium">This is a project implementing various examples of routing transitions</p>
      <aside className="text-sm italic mb-7">
        Built with{" "}
        <a
          className="underline hover:text-blue-800 visited:text-purple-900"
          href="https://reactrouter.com"
          target="_blank"
        >
          React Route
        </a>
        ,{" "}
        <a
          className="underline hover:text-blue-800 visited:text-purple-900"
          href="https://www.framer.com/motion"
          target="_blank"
        >
          Framer Motion
        </a>
      </aside>

      <div className="flex gap-4">
        <Link
          to="/1"
          className="px-5 py-2 text-sm font-medium text-white transition-colors bg-teal-600 rounded-full shadow-md shadow-teal-700/50 hover:bg-teal-700"
          state={{ from: "Main" }}
        >
          Example 1
        </Link>
        <Link
          to="/2"
          className="px-5 py-2 text-sm font-medium text-white transition-colors bg-pink-600 rounded-full shadow-md shadow-pink-700/50 hover:bg-pink-700"
          state={{ from: "Main" }}
        >
          Example 2
        </Link>
        <Link
          to="/3"
          className="px-5 py-2 text-sm font-medium text-white transition-colors bg-yellow-300 rounded-full shadow-md shadow-yellow-400/50 hover:bg-yellow-400"
          state={{ from: "Main" }}
        >
          Example 3
        </Link>
        <Link
          to="/wireframe"
          className="px-5 py-2 text-sm font-medium text-white transition-colors rounded-full shadow-md bg-slate-500 shadow-slate-600/50 hover:bg-slate-600"
        >
          Wireframe
        </Link>
      </div>
    </motion.main>
  );
};

export default Main;
