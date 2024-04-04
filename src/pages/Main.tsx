const Main = () => {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center p-5">
      <h1 className="text-3xl font-semibold mb-4">React Router Transitions</h1>
      <p className="text-lg font-medium mb-1">This is a project implementing various examples of routing transitions</p>
      <aside className="text-sm italic mb-7">
        Built with{" "}
        <a
          className="underline hover:text-blue-800 visited:text-purple-900"
          href="https://reactrouter.com"
          target="_blank"
        >
          React Router
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
        <button className="px-5 py-2 text-sm font-medium rounded-full bg-teal-600 text-white shadow-md shadow-teal-700/50 hover:bg-teal-700 transition-colors">
          Example 1
        </button>
        <button className="px-5 py-2 text-sm font-medium rounded-full bg-pink-600 text-white shadow-md shadow-pink-700/50 hover:bg-pink-700 transition-colors">
          Example 2
        </button>
      </div>
    </main>
  );
};

export default Main;
