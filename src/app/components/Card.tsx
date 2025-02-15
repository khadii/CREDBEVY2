import { CircleArrowOutUpRight } from "lucide-react";
import { ReactNode } from "react";

interface CardProps {
  title: string;
  amount: string;
  percentage: string;
  icon: ReactNode;
}

const Card = ({ title, amount, percentage, icon }: CardProps) => {
  const slicedAmount = amount.length > 8 ? amount.slice(0, 8) + "..." : amount;
  return (
    <div className="px-6 py-7 shadow-md bg-white rounded-lg">
      <div className="flex flex-col items-start ">
        <div className="bg-[#EBFEFF] p-2 rounded-full mb-6">{icon}</div>
        <p className="text-[#A1A6B0] font-semibold text-xs mb-1">{title}</p>
        <div className="flex w-full justify-between">
          {" "}
          <h2 className="text-3xl font-semibold text-[#333333] w-full">
            {slicedAmount}
          </h2>
          <div className="bg-[#EDFCF1] px-2 py-1 rounded-full flex items-center space-x-1 ">
            <div>
              <CircleArrowOutUpRight className="h-2 w-2 text-[#42BE65]"/>
            </div>
            <p className=" text-[#42BE65] text-[10px] font-semibold">{percentage}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
