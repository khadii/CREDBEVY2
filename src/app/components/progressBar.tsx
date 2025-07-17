// "use client";

// import React from "react";

// type ProgressBarProps = {
//   label: string;
//   value: any;
//   maxValue: number;
//   color?: string;
// };

// const ProgressBarComponent = ({
//   label,
//   value,
//   maxValue,
//   color = "#0F4C5C",
// }: ProgressBarProps) => {
//   const percentage = (value / maxValue) * 100;

//   return (
//     <div className="mb-4">
//       <div className="flex justify-between items-center mb-3">
//         <span className="text-sm text-[#333333]">{label}</span>
//         <span className="text-sm " style={{ color }}>{maxValue.toLocaleString()}</span>
//       </div>
//       <div className="w-full bg-gray-200 rounded-full h-2">
//         <div
//           className="h-2 rounded-full"
//           style={{ width: `${percentage}%`, backgroundColor: color }}
//         ></div>
//       </div>
//     </div>
//   );
// };

// export default ProgressBarComponent;



"use client";

import React from "react";

type ProgressBarProps = {
  label: string;
  value: number; 
  color?: string;
};

const ProgressBarComponent = ({
  label,
  value, 
  color = "#0F4C5C",
}: ProgressBarProps) => {

  const clampedValue = Math.min(Math.max(0, value), 100);

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-[#333333]">{label}</span>
        <span className="text-sm " style={{ color }}>{value}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="h-2 rounded-full"
          style={{ width: `${clampedValue}%`, backgroundColor: color }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBarComponent;