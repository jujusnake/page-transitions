import useBackground from "../../lib/useBackground";
import Card from "../../components/Card";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { motion } from "framer-motion";

const WireframeMain = () => {
  useBackground("#373737");
  const navigate = useNavigate();

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [isPrinted, setIsPrinted] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<number>(0);

  // Scroll Actions
  const { scrollYProgress } = useScroll({ target: scrollContainerRef, offset: ["start 0.8", "center 0.6"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-60dvh", "10dvh"]);
  const card1y = useTransform(scrollYProgress, [0, 1], ["-2dvh", "-8dvh"]);
  const card3y = useTransform(scrollYProgress, [0, 1], ["2dvh", "10dvh"]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest === 1) {
      setIsPrinted(true);
      scrollYProgress.clearListeners();
      y.destroy();
      card1y.destroy();
      card3y.destroy();
    }
  });

  // Event Handler
  const handleClickCard = (cardNum: number) => {
    if (isPrinted === false) return;
    setSelectedCard((prev) => (prev === cardNum ? 0 : cardNum));
    navigate(`card/${cardNum}`);
  };

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
        className={`${isPrinted === true ? "z-[99999]" : "z-0"} h-dvh flex flex-col items-center relative`}
        ref={scrollContainerRef}
      >
        {/* Printer */}
        <div className={`flex flex-col items-center h-[20%] ${isPrinted === true ? "z-10" : "z-[100]"}`}>
          <div className="bg-[#373737] w-screen flex-grow"></div>
          <div className="bg-[#373737] w-screen flex justify-center h-16">
            <div className="w-[50vw] h-full  bg-red-500"></div>
          </div>
        </div>

        {/* Cards */}
        <motion.div className={`flex-grow w-full  ${isPrinted === true ? "z-[100]" : "z-0"}`}>
          <motion.div
            className="flex items-center justify-center w-full h-full gap-6 px-6 pb-[20dvh]"
            style={{ y: isPrinted ? 0 : y, transition: isPrinted ? "all 0.3s ease-in-out" : "none" }}
          >
            <Card
              title="Card 1"
              imgSrc="/card_1.png"
              onClick={() => handleClickCard(1)}
              selected={selectedCard === 1}
              style={{
                x: isPrinted ? 0 : "25vw",
                y: isPrinted ? 0 : card1y,
                transition: isPrinted ? "all 0.3s ease-in-out" : "none",
              }}
            />
            <Card
              title="Card 2"
              imgSrc="/card_2.png"
              onClick={() => handleClickCard(2)}
              selected={selectedCard === 2}
              style={{
                x: isPrinted ? 0 : "5vw",
                transition: isPrinted ? "all 0.3s ease-in-out" : "none",
              }}
              exitWithoutFrame
            />
            <Card
              title="Card 3"
              imgSrc="/card_3.png"
              onClick={() => handleClickCard(3)}
              selected={selectedCard === 3}
              style={{
                x: isPrinted ? 0 : "-35vw",
                y: isPrinted ? 0 : card3y,
                transition: isPrinted ? "all 0.3s ease-in-out" : "none",
              }}
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
