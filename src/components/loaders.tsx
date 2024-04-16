import { motion } from "framer-motion";

const Viewer1Loader = () => {
  return (
    <motion.div className="fixed top-0 left-0 w-screen text-black bg-white h-dvh">
      <div className="flex flex-col h-full">
        <div className="flex flex-grow">asdf</div>
        <div className="h-[75dvh]" />
        <div className="flex-grow">asdlf</div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full scale-75">
        <img className="object-cover w-full h-full" src="/card_1.png" />
      </div>
    </motion.div>
  );
};

export { Viewer1Loader };
