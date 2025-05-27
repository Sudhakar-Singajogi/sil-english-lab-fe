import { useState, useEffect } from "react";

const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

export const useResponsiveChunks = (cards) => {
  const [chunks, setChunks] = useState([]);

  const updateChunks = () => {
    const width = window.innerWidth;
    let chunkSize = 1;

    if (width >= 900) {
      chunkSize = 3;
    } else if (width > 500 && width < 900) {
      chunkSize = 2;
    } else if (width <= 499) {
      chunkSize = 1;
    }

    setChunks(chunkArray(cards, chunkSize));
  };

  useEffect(() => {
    updateChunks(); // Initial check
    window.addEventListener("resize", updateChunks);
    return () => window.removeEventListener("resize", updateChunks);
  }, [cards]);

  return chunks;
};
