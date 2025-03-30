
import React from 'react';

const SpinningFaceExact = () => {
  return (
    <div className="flex justify-center items-center max-h-screen h-screen bg-[#FAFAFA] min-h-screen">
      <div className="w-32 h-32 relative animate-spin">
        {/* Dotted circle */}
        <div className="absolute inset-0 w-full h-full ">
          {/* Create 8 dashes around the circle */}
          {Array.from({ length: 8 }).map((_, index) => (
            <div 
              key={index} 
              className="absolute w-1 h-1 bg-gray-400 rounded-full "
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${index * 45}deg) translateX(48px) translateY(-50%)`,
              }}
            />
          ))}
        </div>
        
        {/* Eyes and center dot */}
        <div className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-black"></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-black"></div>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-black"></div>
      </div>
    </div>
  );
};

export default SpinningFaceExact;








// export const SpinningFaceExactTransparent = () => {
//   return (
//     <div className="flex justify-center items-center max-h-screen h-screen bg-transparent min-h-screen">
//       <div className="w-32 h-32 relative animate-spin">
//         {/* Dotted circle */}
//         <div className="absolute inset-0 w-full h-full ">
//           {/* Create 8 dashes around the circle */}
//           {Array.from({ length: 8 }).map((_, index) => (
//             <div 
//               key={index} 
//               className="absolute w-1 h-1 bg-gray-400 rounded-full "
//               style={{
//                 top: '50%',
//                 left: '50%',
//                 transform: `rotate(${index * 45}deg) translateX(48px) translateY(-50%)`,
//               }}
//             />
//           ))}
//         </div>
        
//         {/* Eyes and center dot */}
//         <div className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-black"></div>
//         <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-black"></div>
//         <div className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-black"></div>
//       </div>
//     </div>
//   );
// };

