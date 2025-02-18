import { CircleArrowOutUpRight } from "lucide-react";
import { ReactNode } from "react";
import { BsArrowUpRightCircle, BsArrowUpRightCircleFill } from "react-icons/bs";

interface CardProps {
  title: string;
  amount: string;
  percentage: string;
  icon: ReactNode;
}

const Card = ({ title, amount, percentage, icon }: CardProps) => {
  // const slicedAmount = amount.length > 8 ? amount.slice(0, 8) + "..." : amount;
  
  return (
    <div className="px-6 py-[26px] border  bg-white rounded-lg">
      <div className="flex flex-col items-start w-full ">
        <div className="bg-[#EBFEFF] p-2 rounded-full mb-6">{icon}</div>
        <p className="text-[#A1A6B0] font-bold text-xs mb-1">{title}</p>
        <div className="flex justify-between items-end w-full">
  <div className="w-full ">
    <h2 className="text-3xl font-bold text-[#333333]">{amount}</h2>
  </div>
  <div className="bg-[#EDFCF1] rounded-full flex items-center space-x-1  px-2 py-1">
    <div>
     <BsArrowUpRightCircle fontWeight={'700'} className="h-2 w-2 text-[#42BE65] font-bold" />
    </div>
    <p className="text-[#42BE65] text-[10px] font-bold">{percentage}</p>
  </div>
</div>

      </div>
    </div>
  );
};

export default Card;
