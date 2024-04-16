import { AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

const WaitLayout = (props: { children: ReactNode }) => {
  return (
    <AnimatePresence mode="wait" initial={false}>
      {props.children}
    </AnimatePresence>
  );
};

export default WaitLayout;
