import React from "react";


// Type definitions for Card props
interface CardProps {
  title: string;
  detail: string;
  description: string;
  color: "green" | "yellow" | "red"; // Allowing only specific color values
}

// Reusable Card Component
const Card: React.FC<CardProps> = ({ title, detail, description, color }) => {
  // Mapping color prop values to border colors
  const borderColorMap = {
    green: "border-[#42BE65]",
    yellow: "border-[#F4C418]",
    red: "border-[#E33A24]",
  };
  
  
  return (
    <div className={`bg-[#FAFAFA] p-6 rounded-md border-l-2 ${borderColorMap[color]}`}>
      <div className="flex flex-col items-start">
        <h3 className="text-[14px] font-bold text-[#333333]">{title}</h3>
        <span className={`text-[14px] font-bold text-[#333333]`}>
          {detail}
        </span>
      </div>
      <p className="text-xs text-[#8A8B9F] font-medium mt-6 w-full max-w-[300px]">
        {description}
      </p>
    </div>
  );
};

const CreditInfoCard: React.FC = () => {
  const sections = [
    {
      title: "On time Payment",
      detail: "1 Late Payment",
      description:
        "Late payment negatively affects credit score, making it harder to obtain credit in the future. It's important to make payments on time and communicate with lenders if there are difficulties.",
      color: "green" as "green", 
    },
    {
      title: "Credit History",
      detail: "100%",
      description:
        "Credit history is a record of borrowing and repayment behavior that affects credit score. Timely payments, low credit utilization, and diverse credit types can improve credit history.",
      color: "green" as "green",
    },
    {
      title: "Credit Utilization",
      detail: "30% • Low Usage",
      description:
        "Credit utilization is the amount of credit a borrower is using compared to their available credit. Keeping it below 30% is recommended to avoid lowering credit score.",
      color: "yellow" as "yellow",
    },
    {
      title: "Hard Inquiry",
      detail: "67%",
      description:
        "A hard inquiry is when a lender checks a borrower's credit report for a lending decision. Multiple inquiries can lower credit score, so borrowers should space out credit applications.",
      color: "red" as "red",
    },
  ];

  return (
    <div className="mx-auto py-6 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section, index) => (
          <Card
            key={index}
            title={section.title}
            detail={section.detail}
            description={section.description}
            color={section.color}
          />
        ))}
      </div>
    </div>
  );
};

export default CreditInfoCard;