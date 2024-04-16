import { HTMLMotionProps, MotionStyle, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = {
  title?: string;
  imgSrc?: string;
  onClick?: () => void;
  childClassName?: string;
  style?: MotionStyle;
  exitWithoutFrame?: boolean;
} & HTMLMotionProps<"div">;

const Card = ({ imgSrc, onClick, exitWithoutFrame, ...props }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [selected, setSelected] = useState(false);
  const [offsetToCenter, setOffset] = useState({ x: 0, y: 0 });
  const [aspectRatio, setAspectRatio] = useState(0.833);
  const [scale, setScale] = useState(1);

  const setOffsetToCenter = () => {
    if (containerRef.current) {
      const { left, width, height, top } = containerRef.current.getBoundingClientRect();
      const originLeft = left + width / 2;
      const centerLeft = window.innerWidth / 2;
      const centerTop = document.documentElement.clientHeight / 2 - height / 2 - top;

      setOffset({ x: centerLeft - originLeft, y: centerTop });
    }
  };

  const setCurrentViewportAspectRatio = () => {
    const aspectRatio = window.innerWidth / window.innerHeight;
    setAspectRatio(aspectRatio);
  };

  const setCurrentViewportScale = () => {
    if (containerRef.current) {
      const newScale = window.innerWidth / containerRef.current?.getBoundingClientRect().width;
      setScale(newScale);
    }
  };

  useEffect(() => {
    setOffsetToCenter();
    window.addEventListener("scroll", setOffsetToCenter);

    return () => {
      window.removeEventListener("scroll", setOffsetToCenter);
    };
  }, []);

  return (
    <motion.div {...props} className="flex-1 flex-shrink-0" ref={containerRef}>
      <motion.button
        type="button"
        className="relative flex w-full overflow-hidden bg-white shadow-xl aspect-[0.877] isolate shadow-black/30"
        exit={
          selected
            ? {
                x: offsetToCenter.x,
                y: offsetToCenter.y,
                scale: scale,
                aspectRatio: aspectRatio,
                transition: { duration: 0.8, type: "spring", bounce: 0 },
              }
            : {}
        }
        style={{
          zIndex: selected ? 100 : 0,
          transformStyle: "preserve-3d",
          willChange: "transform, visibility, z-index",
        }}
        onClick={() => {
          setSelected(true);
          setOffsetToCenter();
          setCurrentViewportAspectRatio();
          setCurrentViewportScale();
          onClick && onClick();
        }}
      >
        {imgSrc && (
          <motion.div
            className="absolute top-0 left-0 z-0 w-full h-full transition-transform scale-75"
            exit={
              selected && exitWithoutFrame
                ? {
                    scale: 1,
                    transition: { duration: 0.2, type: "spring", bounce: 0 },
                  }
                : {}
            }
          >
            <motion.img
              exit={selected ? { opacity: 0.99, transition: { duration: 0.3, delay: 1 } } : {}}
              src={imgSrc}
              className="object-cover w-full h-full"
            />
          </motion.div>
        )}
        {/* <div className="z-10 flex flex-col justify-end h-full p-5">
          <h1 className="text-4xl font-semibold drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)]">{title}</h1>
        </div> */}
      </motion.button>
    </motion.div>
  );
};

export default Card;
