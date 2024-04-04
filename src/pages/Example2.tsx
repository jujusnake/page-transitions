import { motion, useIsPresent } from "framer-motion";

const Example2 = () => {
  const isPresent = useIsPresent();

  return (
    <motion.main key="example1">
      Example2
      <motion.div
        key="example1"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0, transition: { duration: 0.5, ease: "circOut" } }}
        exit={{ scaleX: 1, transition: { duration: 0.5, ease: "circIn" } }}
        style={{ originX: isPresent ? 0 : 1 }}
        className="fixed top-0 bottom-0 left-0 right-0 z-50 bg-blue-500 privacy-screen"
      />
    </motion.main>
  );
};

export default Example2;
