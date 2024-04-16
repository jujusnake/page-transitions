import { useEffect } from "react";

const useBackground = (color: string) => {
  useEffect(() => {
    document.body.style.backgroundColor = color;
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [color]);
};

export default useBackground;
