import { MotionStyle, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = {
  title?: string;
  imgSrc?: string;
  onClick?: () => void;
  childClassName?: string;
  selected?: boolean;
  style?: MotionStyle;
  exitWithoutFrame?: boolean;
};

const Card = ({ imgSrc, onClick, selected, style, exitWithoutFrame }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [offsetToCenter, setOffset] = useState({ x: 0, y: 0 });
  const [aspectRatio, setAspectRatio] = useState("1 / 1");
  const [scale, setScale] = useState(1);

  const setOffsetToCenter = () => {
    if (containerRef.current) {
      const { left, width, height, top } = containerRef.current.getBoundingClientRect();
      const originLeft = left + width / 2;
      const centerLeft = document.documentElement.clientWidth / 2;
      const centerTop = document.documentElement.clientHeight / 2 - height / 2 - top;

      setOffset({ x: centerLeft - originLeft, y: centerTop });
    }
  };

  const setCurrentViewportAspectRatio = () => {
    const aspectRatio = `${window.innerWidth} / ${window.innerHeight}`;
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
    <motion.div className="flex-1 flex-shrink-0 bg-red-200" ref={containerRef} style={{ ...style }}>
      <motion.button
        type="button"
        className="w-full bg-white aspect-[10/12] relative flex overflow-hidden isolate shadow-xl shadow-black/30"
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
          setOffsetToCenter();
          setCurrentViewportAspectRatio();
          setCurrentViewportScale();
          onClick && onClick();
        }}
      >
        {imgSrc && (
          <motion.div
            className="absolute z-0 left-10 bottom-10 top-10 right-10"
            exit={
              selected && exitWithoutFrame
                ? {
                    left: 0,
                    bottom: 0,
                    top: 0,
                    right: 0,
                    transition: { duration: 0.1, type: "spring", bounce: 0 },
                  }
                : {}
            }
          >
            <motion.img
              exit={{ opacity: 0.99, transition: { duration: 0.3, delay: 1 } }}
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
