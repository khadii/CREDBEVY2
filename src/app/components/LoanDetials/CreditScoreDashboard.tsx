"use client"

import { useEffect, useState } from "react"

export default function CreditScoreGauge() {
  const [score, setScore] = useState(0)

  useEffect(() => {
    // Animate the score from 0 to 700
    const timer = setTimeout(() => {
      setScore(700)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // Calculate the position of the gauge indicator
  const min = 400
  const max = 800
  const range = max - min
  const percentage = ((score - min) / range) * 100

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative">
        {/* SVG Gauge - Made responsive */}
        <svg
          className="w-full h-auto"
          viewBox="0 0 240 140"
          preserveAspectRatio="xMidYMid meet"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Track */}
          <path d="M30 130 A90 90 0 0 1 210 130" stroke="#F3F4F6" strokeWidth="8" strokeLinecap="round" />

          {/* Colored Gradient Track */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF7676" />
              <stop offset="45%" stopColor="#FFD9D9" />
              <stop offset="100%" stopColor="#40E0D0" />
            </linearGradient>
          </defs>

          {/* Foreground Track (Static Color) */}
          <path d="M30 130 A90 90 0 0 1 210 130" stroke="url(#gradient)" strokeWidth="8" strokeLinecap="round" />

          {/* Gauge Knob */}
          <circle
            cx={120 - 90 * Math.cos((percentage / 100) * Math.PI)}
            cy={130 - 90 * Math.sin((percentage / 100) * Math.PI)}
            r="8"
            fill="white"
            stroke="#1B4D4D"
            strokeWidth="1"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Score Display - Made responsive with relative units */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[#42BE65] text-clamp-xs font-medium">Good</span>
          <span className="text-[#1F2937] text-clamp-3xl font-extrabold leading-none mt-2">{score}</span>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-[#42BE65] text-clamp-xs font-semibold">+</span>
            <span className="text-[#42BE65] text-clamp-xs font-semibold">24 pts</span>
          </div>
        </div>

        {/* Range Labels - Using negative margin to pull up */}
        <div className="flex justify-between px-4 -mt-2">
          <span className="text-gray-600 text-clamp-xs font-semibold">{min}</span>
          <span className="text-gray-600 text-clamp-xs font-semibold">{max}</span>
        </div>

        {/* Last Updated - Using negative margin to pull up */}
        <div className="text-center -mt-1">
          <span className="text-[#6B7280] text-clamp-xs font-semibold">Last updated 21st June 2022</span>
        </div>
      </div>
    </div>
  )
}
// "use client"

// import { PieChart, Pie, Cell, Text } from "recharts"

// export  function DoughnutChart() {
//   // First dataset with colors
//   const data = [
//     { value: 30, color: "rgb(255, 69, 96)" },
//     { value: 30, color: "rgb(206, 148, 73)" },
//     { value: 20, color: "rgb(153, 223, 89)" },
//     { value: 1, color: "rgba(0, 0, 0, 0.6)" },
//     { value: 20, color: "rgb(153, 223, 89)" },
//   ]

//   // Second dataset (mostly transparent)
//   const overlayData = [
//     { value: 30, color: "rgba(0, 0, 0, 0)" },
//     { value: 30, color: "rgba(0, 0, 0, 0)" },
//     { value: 20, color: "rgba(0, 0, 0, 0)" },
//     { value: 1, color: "rgba(0, 0, 0, 0.6)" },
//     { value: 20, color: "rgba(0, 0, 0, 0)" },
//   ]

//   // Title text to display at the bottom
//   const titleText = "4"

//   return (
//     <ChartContainer className="h-[300px] w-[300px]">
//       <PieChart>
//         {/* First dataset */}
//         <Pie
//           data={data}
//           dataKey="value"
//           cx="50%"
//           cy="50%"
//           outerRadius={100}
//           startAngle={180}
//           endAngle={0}
//           isAnimationActive={false}
//         >
//           {data.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
//           ))}
//         </Pie>

//         {/* Second dataset (overlay) */}
//         <Pie
//           data={overlayData}
//           dataKey="value"
//           cx="50%"
//           cy="50%"
//           outerRadius={100}
//           startAngle={180}
//           endAngle={0}
//           isAnimationActive={false}
//         >
//           {overlayData.map((entry, index) => (
//             <Cell key={`overlay-cell-${index}`} fill={entry.color} stroke="none" />
//           ))}
//         </Pie>

//         {/* Title at the bottom */}
//         <Text x="50%" y="85%" textAnchor="middle" dominantBaseline="middle" className="text-lg font-medium">
//           {titleText}
//         </Text>
//       </PieChart>
//     </ChartContainer>
//   )
// }








// "use client"
// import { useState, useEffect } from "react"
// import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

// export default function CreditScoreGauge() {
//   // State to track the credit score
//   const [score, setScore] = useState(0)

//   // Effect to animate the score from 0 to 700
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setScore(700)
//     }, 100)
//     return () => clearTimeout(timer)
//   }, [])

//   // Credit score ranges and colors
//   const ranges = [
//     { min: 300, max: 579, color: '#FF7676', label: 'Poor' },
//     { min: 580, max: 669, color: '#FFD9D9', label: 'Fair' },
//     { min: 670, max: 739, color: '#40E0D0', label: 'Good' },
//     { min: 740, max: 799, color: '#40E0D0', label: 'Very Good' },
//     { min: 800, max: 850, color: '#40E0D0', label: 'Excellent' }
//   ]

//   // Determine the current range
//   const currentRange = ranges.find(range => 
//     score >= range.min && score <= range.max
//   ) || ranges[0]

//   // Calculate the position of the gauge indicator
//   const min = 400
//   const max = 800
//   const range = max - min
//   const percentage = ((score - min) / range) * 100

//   // Data for the pie chart
//   const data = [
//     { name: 'Score', value: percentage },
//     { name: 'Remaining', value: 100 - percentage }
//   ]

//   // Color gradient based on score ranges
//   const COLORS = [
//     '#FF7676',   // Poor (Red)
//     '#FFD9D9',   // Fair (Light Red)
//     '#40E0D0'    // Good/Very Good/Excellent (Teal)
//   ]

//   return (
//     <div className="w-full max-w-md mx-auto">
//       <div className="relative">
//         {/* Recharts Gauge */}
//         <ResponsiveContainer width="100%" height={200}>
//           <PieChart>
//             <Pie
//               data={data}
//               startAngle={180}
//               endAngle={0}
//               innerRadius="70%"
//               outerRadius="90%"
//               paddingAngle={0}
//               dataKey="value"
//             >
//               {data.map((entry, index) => (
//                 <Cell 
//                   key={`cell-${index}`} 
//                   fill={index === 0 ? currentRange.color : COLORS[2]}
//                 />
//               ))}
//             </Pie>
//           </PieChart>
//         </ResponsiveContainer>

//         {/* Score Display */}
//         <div className="absolute inset-0 flex flex-col items-center justify-center">
//           <span className={`
//             ${currentRange.color === '#FF7676' ? 'text-[#FF7676]' : 
//               currentRange.color === '#FFD9D9' ? 'text-[#FFD9D9]' : 
//               'text-[#42BE65]'} 
//             text-xs sm:text-[11px] font-medium
//           `}>
//             {currentRange.label}
//           </span>
//           <span className="text-[#1F2937] text-3xl sm:text-4xl font-extrabold leading-none mt-2">
//             {score}
//           </span>
//           <div className="flex items-center gap-1 mt-1">
//             <span className="text-[#42BE65] text-xs sm:text-[11px] font-semibold">+</span>
//             <span className="text-[#42BE65] text-xs sm:text-[11px] font-semibold">24 pts</span>
//           </div>
//         </div>

//         {/* Range Labels */}
//         <div className="flex justify-between px-4 -mt-8">
//           <span className="text-gray-600 text-xs sm:text-[13px] font-semibold">{min}</span>
//           <span className="text-gray-600 text-xs sm:text-[13px] font-semibold">{max}</span>
//         </div>

//         {/* Last Updated */}
//         <div className="text-center -mt-1">
//           <span className="text-[#6B7280] text-xs sm:text-[13px] font-semibold">
//             Last updated 21st June 2022
//           </span>
//         </div>
//       </div>
//     </div>
//   )
// }





// "use client"
// import { useState, useEffect } from "react"
// import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

// export default function CreditScoreGauge() {
//   // State to track the credit score
//   const [score, setScore] = useState(0)

//   // Effect to animate the score from 0 to 700
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setScore(700)
//     }, 100)
//     return () => clearTimeout(timer)
//   }, [])

//   // Credit score ranges and colors
//   const ranges = [
//     { min: 300, max: 579, color: '#FF4D4D', label: 'Poor' },
//     { min: 580, max: 669, color: '#FFA500', label: 'Fair' },
//     { min: 670, max: 850, color: '#4CAF50', label: 'Good' }
//   ]

//   // Determine the current range
//   const currentRange = ranges.find(range => 
//     score >= range.min && score <= range.max
//   ) || ranges[0]

//   // Calculate the position of the gauge indicator
//   const min = 300
//   const max = 850
//   const range = max - min
//   const percentage = ((score - min) / range) * 100

//   // Determine which color sections to show based on score
//   const getDataSections = () => {
//     if (score <= 579) {
//       return [
//         { name: 'Poor', value: percentage },
//         { name: 'Remaining', value: 100 - percentage }
//       ]
//     } else if (score <= 669) {
//       return [
//         { name: 'Poor', value: (579 - min) / range * 100 },
//         { name: 'Fair', value: (score - 579) / range * 100 },
//         { name: 'Remaining', value: 100 - percentage }
//       ]
//     } else {
//       return [
//         { name: 'Poor', value: (579 - min) / range * 100 },
//         { name: 'Fair', value: (669 - 579) / range * 100 },
//         { name: 'Good', value: (score - 669) / range * 100 }
//       ]
//     }
//   }

//   const data = getDataSections()

//   // Colors corresponding to each section
//   const COLORS = ['#FF4D4D', '#FFA500', '#4CAF50']

//   return (
//     <div className="w-full max-w-md mx-auto">
//       <div className="relative">
//         {/* Recharts Gauge */}
//         <ResponsiveContainer width="100%" height={200}>
//           <PieChart>
//             <Pie
//               data={data}
//               startAngle={180}
//               endAngle={0}
//               innerRadius="70%"
//               outerRadius="90%"
//               paddingAngle={0}
//               dataKey="value"
//             >
//               {data.map((entry, index) => (
//                 <Cell
//                   key={`cell-${index}`}
//                   fill={COLORS[index] || COLORS[COLORS.length - 1]}
//                 />
//               ))}
//             </Pie>
//           </PieChart>
//         </ResponsiveContainer>

//         {/* Score Display */}
//         <div className="absolute inset-0 flex flex-col items-center justify-center">
//           <span className={`
//             ${currentRange.color === '#FF4D4D' ? 'text-[#FF4D4D]' :
//               currentRange.color === '#FFA500' ? 'text-[#FFA500]' :
//               'text-[#4CAF50]'}
//             text-xs sm:text-[11px] font-medium
//           `}>
//             {currentRange.label}
//           </span>
//           <span className="text-[#1F2937] text-3xl sm:text-4xl font-extrabold leading-none mt-2">
//             {score}
//           </span>
//           <div className="flex items-center gap-1 mt-1">
//             <span className="text-[#4CAF50] text-xs sm:text-[11px] font-semibold">+</span>
//             <span className="text-[#4CAF50] text-xs sm:text-[11px] font-semibold">24 pts</span>
//           </div>
//         </div>

//         {/* Range Labels */}
//         <div className="flex justify-between px-4 -mt-8">
//           <span className="text-gray-600 text-xs sm:text-[13px] font-semibold">{min}</span>
//           <span className="text-gray-600 text-xs sm:text-[13px] font-semibold">{max}</span>
//         </div>

//         {/* Last Updated */}
//         <div className="text-center -mt-1">
//           <span className="text-[#6B7280] text-xs sm:text-[13px] font-semibold">
//             Last updated 21st June 2022
//           </span>
//         </div>
//       </div>
//     </div>
//   )
// }