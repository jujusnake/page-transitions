import useBackground from "../../lib/useBackground";
import Card from "../../components/Card";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { useScroll, useTransform } from "framer-motion";
import { motion } from "framer-motion";

const WireframeMain = () => {
  useBackground("#373737");
  const navigate = useNavigate();

  // refs
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // States
  /**
   * stage 0 : Scroll action
   * stage 1 : container to y=0
   * stage 2 : cards spread
   * stage 3 : cards clickable
   * stage 4 : card clicked and exit page
   */
  const [transitionStage, setTransitionStage] = useState<number>(0);
  const zInverted = useMemo(() => transitionStage === 4, [transitionStage]);

  // Scroll Actions
  const { scrollYProgress } = useScroll({ target: scrollContainerRef, offset: ["start 0.8", "center 0.6"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-60dvh", "10dvh"]);
  const card1y = useTransform(scrollYProgress, [0, 1], ["-2dvh", "-8dvh"]);
  const card3y = useTransform(scrollYProgress, [0, 1], ["2dvh", "10dvh"]);

  // Event Handler
  const handleEndScroll = (latest: number) => {
    if (latest === 1) {
      scrollYProgress.destroy();
      y.destroy();
      card1y.destroy();
      card3y.destroy();
      setTransitionStage((prev) => (prev < 1 ? 1 : prev));
    }
  };

  const handleClickCard = (cardNum: number) => {
    document.documentElement.style.overflow = "hidden";
    setTransitionStage(4);
    navigate(`card/${cardNum}`);
  };

  // Life Cycle
  useEffect(() => {
    const unsubScroll = scrollYProgress.on("change", handleEndScroll);
    handleEndScroll(scrollYProgress.get());

    return () => {
      unsubScroll();
      document.documentElement.style.overflow = "auto";
    };
  }, []);

  return (
    <main className="flex flex-col overflow-hidden text-white">
      {/* Hero Video */}
      <div className="relative z-10 w-full h-dvh bg-[#373737]">
        <h1 className="absolute top-[10dvh] left-1/2 -translate-x-1/2 z-10 text-center text-5xl leading-normal font-semibold uppercase">
          New Era
          <br />
          New Dimension
        </h1>
        <video autoPlay loop muted playsInline src="/desert.mp4" className="object-cover w-full h-full" />
      </div>

      <div
        className={`${zInverted ? "z-[99999]" : "z-0"} h-dvh flex flex-col items-center relative`}
        ref={scrollContainerRef}
      >
        {/* Printer */}
        <div className={`flex flex-col items-center h-[20%] ${zInverted ? "z-10" : "z-[100]"}`}>
          <div className="bg-[#373737] w-screen flex-grow"></div>
          <div className="bg-[#373737] w-screen flex justify-center h-16">
            <div className="w-[50vw] h-full  bg-red-500"></div>
          </div>
        </div>

        {/* Cards */}
        <motion.div className={`flex-grow w-full  ${zInverted ? "z-[100]" : "z-0"}`}>
          <motion.div
            className="flex items-center justify-center w-full h-full gap-6 px-6 pb-[20dvh]"
            style={{
              y: transitionStage > 0 ? 0 : y,
              transition: transitionStage === 1 ? "all 0.3s ease-in-out" : "none",
            }}
            id="card-container"
            onTransitionEnd={() => setTransitionStage(2)}
          >
            <Card
              title="Card 1"
              imgSrc="/card_1.png"
              onClick={() => handleClickCard(1)}
              style={{
                x: transitionStage > 1 ? 0 : "25vw",
                y: transitionStage > 1 ? 0 : card1y,
                transition: transitionStage === 2 ? "all 0.3s ease-in-out" : "none",
                pointerEvents: transitionStage > 2 && zInverted === false ? "auto" : "none",
              }}
              onTransitionEnd={(e) => {
                e.stopPropagation();
                setTransitionStage(3);
              }}
            />
            <Card
              title="Card 2"
              imgSrc="/card_2.png"
              onClick={() => handleClickCard(2)}
              style={{
                x: transitionStage > 1 ? 0 : "5vw",
                transition: transitionStage === 2 ? "all 0.3s ease-in-out" : "none",
                pointerEvents: transitionStage > 2 && zInverted === false ? "auto" : "none",
              }}
              onTransitionEnd={(e) => e.stopPropagation()}
              exitWithoutFrame
            />
            <Card
              title="Card 3"
              imgSrc="/card_3.png"
              onClick={() => handleClickCard(3)}
              style={{
                x: transitionStage > 1 ? 0 : "-35vw",
                y: transitionStage > 1 ? 0 : card3y,
                transition: transitionStage === 2 ? "all 0.3s ease-in-out" : "none",
                pointerEvents: transitionStage > 2 && zInverted === false ? "auto" : "none",
              }}
              onTransitionEnd={(e) => e.stopPropagation()}
              exitWithoutFrame
            />
          </motion.div>
        </motion.div>
      </div>

      <div className="h-[5000px] bg-red-300"></div>
    </main>
  );
};

export default WireframeMain;
