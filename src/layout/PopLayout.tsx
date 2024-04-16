import { AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

const PopLayout = (props: { children: ReactNode }) => {
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      {props.children}
    </AnimatePresence>
  );
};

export default PopLayout;
