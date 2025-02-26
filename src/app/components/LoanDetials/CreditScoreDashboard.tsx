// "use client"

// import { useEffect, useState } from "react"

// export default function CreditScoreGauge() {
//   const [score, setScore] = useState(0)

//   useEffect(() => {
//     // Animate the score from 0 to 660
//     const timer = setTimeout(() => {
//       setScore(660)
//     }, 100)
//     return () => clearTimeout(timer)
//   }, [])

//   // Calculate the position of the gauge indicator
//   const min = 400
//   const max = 800
//   const range = max - min
//   const percentage = ((score - min) / range) * 100

//   return (
//     <div className="w-full max-w-md mx-auto p-6">
//       <div className="relative">
//         {/* SVG Gauge */}
//         <svg className="w-full" viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg">
//           {/* Background Track */}
//           <path d="M30 130 A90 90 0 0 1 210 130" stroke="#F3F4F6" strokeWidth="24" strokeLinecap="round" />

//           {/* Colored Gradient Track */}
//           <defs>
//             <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
//               <stop offset="0%" stopColor="#FF7676" />
//               <stop offset="45%" stopColor="#FFD9D9" />
//               <stop offset="100%" stopColor="#40E0D0" />
//             </linearGradient>
//           </defs>

//           {/* Foreground Track */}
//           <path
//             d="M30 130 A90 90 0 0 1 210 130"
//             stroke="url(#gradient)"
//             strokeWidth="24"
//             strokeLinecap="round"
//             strokeDasharray="282.6"
//             strokeDashoffset={282.6 - (282.6 * percentage) / 100}
//             className="transition-all duration-1000 ease-out"
//           />

//           {/* Gauge Knob */}
//           <circle
//             cx={120 - 90 * Math.cos((percentage / 100) * Math.PI)}
//             cy={130 - 90 * Math.sin((percentage / 100) * Math.PI)}
//             r="12"
//             fill="white"
//             stroke="#1B4D4D"
//             strokeWidth="3"
//             className="transition-all duration-1000 ease-out"
//           />
//         </svg>

//         {/* Score Display */}
//         <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
//           <span className="text-[#22C55E] text-lg font-medium">Good</span>
//           <span className="text-[#1F2937] text-[64px] font-bold leading-none mt-2">{score}</span>
//           <div className="flex items-center gap-1 mt-1">
//             <span className="text-[#22C55E] text-2xl font-medium">+</span>
//             <span className="text-[#22C55E] text-2xl font-medium">24 pts</span>
//           </div>
//         </div>

//         {/* Range Labels */}
//         <div className="flex justify-between mt-4 px-8">
//           <span className="text-gray-600 text-xl font-medium">{min}</span>
//           <span className="text-gray-600 text-xl font-medium">{max}</span>
//         </div>

//         {/* Last Updated */}
//         <div className="text-center mt-6">
//           <span className="text-[#6B7280] text-base">Last updated 21st June 2022</span>
//         </div>
//       </div>
//     </div>
//   )
// }
// "use client"

// import { useEffect, useState } from "react"

// export default function CreditScoreGauge() {
//   const [score, setScore] = useState(0)

//   useEffect(() => {
//     // Animate the score from 0 to 700
//     const timer = setTimeout(() => {
//       setScore(700)
//     }, 100)
//     return () => clearTimeout(timer)
//   }, [])

//   // Calculate the position of the gauge indicator
//   const min = 400
//   const max = 800
//   const range = max - min
//   const percentage = ((score - min) / range) * 100

//   return (
//     <div className="w-full max-w-md mx-auto p-6">
//       <div className="relative">
//         {/* SVG Gauge */}
//         <svg className="w-full" viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg">
//           {/* Background Track */}
//           <path d="M30 130 A90 90 0 0 1 210 130" stroke="#F3F4F6" strokeWidth="24" strokeLinecap="round" />

//           {/* Colored Gradient Track */}
//           <defs>
//             <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
//               <stop offset="0%" stopColor="#FF7676" />
//               <stop offset="45%" stopColor="#FFD9D9" />
//               <stop offset="100%" stopColor="#40E0D0" />
//             </linearGradient>
//           </defs>

//           {/* Foreground Track (Static Color) */}
//           <path
//             d="M30 130 A90 90 0 0 1 210 130"
//             stroke="url(#gradient)"
//             strokeWidth="24"
//             strokeLinecap="round"
//           />

//           {/* Gauge Knob */}
//           <circle
//             cx={120 - 90 * Math.cos((percentage / 100) * Math.PI)}
//             cy={130 - 90 * Math.sin((percentage / 100) * Math.PI)}
//             r="12"
//             fill="white"
//             stroke="#1B4D4D"
//             strokeWidth="3"
//             className="transition-all duration-1000 ease-out"
//           />
//         </svg>

//         {/* Score Display */}
//         <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
//           <span className="text-[#22C55E] text-lg font-medium">Good</span>
//           <span className="text-[#1F2937] text-[64px] font-bold leading-none mt-2">{score}</span>
//           <div className="flex items-center gap-1 mt-1">
//             <span className="text-[#22C55E] text-2xl font-medium">+</span>
//             <span className="text-[#22C55E] text-2xl font-medium">24 pts</span>
//           </div>
//         </div>

//         {/* Range Labels */}
//         <div className="flex justify-between mt-4 px-8">
//           <span className="text-gray-600 text-xl font-medium">{min}</span>
//           <span className="text-gray-600 text-xl font-medium">{max}</span>
//         </div>

//         {/* Last Updated */}
//         <div className="text-center mt-6">
//           <span className="text-[#6B7280] text-base">Last updated 21st June 2022</span>
//         </div>
//       </div>
//     </div>
//   )
// }





// "use client"

// import { useEffect, useState } from "react"

// export default function CreditScoreGauge() {
//   const [score, setScore] = useState(0)

//   useEffect(() => {
//     // Animate the score from 0 to 660
//     const timer = setTimeout(() => {
//       setScore(500)
//     }, 100)
//     return () => clearTimeout(timer)
//   }, [])

//   // Calculate the position of the gauge indicator
//   const min = 400
//   const max = 800
//   const range = max - min
//   const percentage = ((score - min) / range) * 100

//   return (
//     <div className="w-full max-w-md mx-auto p-6 bg-sky-50">
//       <div className="relative">
//         {/* SVG Gauge */}
//         <svg className="w-full" viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg">
//           {/* Background Track - Light pink for middle section */}
//           <path 
//             d="M30 40 A90 90 0 0  120 40" 
//             stroke="#FFD9D9" 
//             strokeWidth="16" 
//             strokeLinecap="round" 
//           />
//             <path 
//             d="M30 40 A90 90 0 0 1 100 40" 
//             stroke="#FFD9D9" 
//             strokeWidth="16" 
//             strokeLinecap="round" 
//           />
          
//           {/* Left Track (Red) */}
//           <path 
//             d="M30 130 A90 90 0 0 1 75 85" 
//             stroke="#FF6B6B" 
//             strokeWidth="16" 
//             strokeLinecap="round" 
//           />
          
//           {/* Right Track (Teal) */}
//           <path 
//             d="M165 85 A90 90 0 0 1 210 130" 
//             stroke="#20B2AA" 
//             strokeWidth="16" 
//             strokeLinecap="round" 
//           />

//           {/* Gauge Knob with dark teal handles */}
//           {/* <line 
//             x1="148" 
//             y1="77" 
//             x2="172" 
//             y2="53" 
//             stroke="#0E5E5E" 
//             strokeWidth="8" 
//             strokeLinecap="round" 
//           /> */}
//           {/* <line 
//             x1="172" 
//             y1="77" 
//             x2="148" 
//             y2="53" 
//             stroke="#0E5E5E" 
//             strokeWidth="8" 
//             strokeLinecap="round" 
//           /> */}
//           <circle 
//             cx={120 - 90 * Math.cos((percentage / 100) * Math.PI)}
//             cy={130 - 90 * Math.sin((percentage / 100) * Math.PI)}
//             r="10" 
//             fill="white" 
//             stroke="white" 
//             strokeWidth="2"
//             className="transition-all duration-1000 ease-out"
//           />
//         </svg>

//         {/* Score Display */}
//         <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
//           <span className="text-green-500 text-xl font-medium">Good</span>
//           <span className="text-gray-800 text-6xl font-bold leading-none mt-1">660</span>
//           <div className="flex items-center mt-1">
//             <span className="text-green-500 text-xl font-medium">+ 24 pts</span>
//           </div>
//         </div>

//         {/* Range Labels */}
//         <div className="flex justify-between mt-2 px-12">
//           <span className="text-gray-700 text-xl font-medium">400</span>
//           <span className="text-gray-700 text-xl font-medium">800</span>
//         </div>

//         {/* Last Updated */}
//         <div className="text-center mt-4">
//           <span className="text-gray-500 text-base">Last updated 21st June 2022</span>
//         </div>
//       </div>
//     </div>
//   )
// }