"use client";

import { useEffect, useState } from "react";

export default function AnimatedLoader({ isLoading }: { isLoading: any }) {
  const [filledBars, setFilledBars] = useState(0);

  const bars = [
    { width: "w-4/5", baseColor: "bg-[#EEF5F5]" },
    { width: "w-full", baseColor: "bg-[#D4E6E6] opacity-[40%]" }, 
    { width: "w-full", baseColor: "bg-[#BDD8D9] opacity-[66%]" },
    { width: "w-4/5", baseColor: "bg-[#156064]" }, 
  ];

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setFilledBars((prev) => {
        // When all bars are filled, reset to 0
        if (prev >= 4) return 0;
        return prev + 1;
      });
    }, 250);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#17191CBA]">
      <div className="space-y-3 w-full max-w-[200px] px-4 mx-auto">
        {bars.map((bar, index) => (
          <div key={index} className="flex justify-center">
            <div
              className={`h-[14px] rounded-[26px] transition-colors duration-300
                ${bar.width}
                ${3 - index < filledBars ? "bg-[#156064]" : bar.baseColor}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
