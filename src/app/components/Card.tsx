import type { ReactNode } from "react"
import { BsArrowUpRightCircle, BsArrowDownRightCircle } from "react-icons/bs"

interface CardProps {
  title: any
  amount: any
  percentage: number | string // Allow both number and string
  icon?: ReactNode // Make icon optional
  image?: string // Optional image prop
  anyName?: boolean // Optional anyName prop for additional condition
}

const Card = ({ title, amount, percentage, icon, image, anyName }: CardProps) => {
  const isNaira = title.includes("Revenue") || title.includes("Loan Disbursed")

  // Convert percentage to number and handle various formats
  const numericPercentage =
    typeof percentage === "string" ? Number.parseFloat(percentage.replace("%", "").replace(",", "")) : percentage

  // Check if the parsed value is a valid number
  const isValidNumber = !isNaN(numericPercentage)
  const isNegative = isValidNumber && numericPercentage < 0

  // For debugging - remove this console.log after fixing
  console.log("Original percentage:", percentage, "Parsed:", numericPercentage, "Is negative:", isNegative)

  // Determine the source for the image/icon
  const displayImage = image || (anyName ? "/activity.svg" : undefined); // Use provided image, or default if anyName is true
  const displayIcon = !displayImage && icon; // Display icon only if no image is being displayed

  return (
    <div className="px-6 py-[26px] border bg-white rounded-lg">
      <div className="flex flex-col items-start w-full">
        <div className="bg-[#EBFEFF] p-2 rounded-full mb-6">
          {/* Conditional rendering for image or icon */}
          {displayImage ? (
            <img src={displayImage} alt={title} className="h-6 w-6" /> // Adjust height/width as needed
          ) : (
            displayIcon // Display the icon if no image is specified or defaulted
          )}
        </div>
        <p className="text-[#A1A6B0] font-bold text-xs mb-1">{title}</p>
        <div className="flex justify-between items-end w-full">
          <div className="flex-1 min-w-0 flex items-center">
            <h2 className="text-3xl font-semibold text-[#333333] truncate">{amount}</h2>
          </div>
          {isValidNumber && (
            <div
              className={`${
                isNegative ? "bg-[#FDE8E8]" : "bg-[#EDFCF1]"
              } rounded-full flex items-center space-x-1 px-2 py-1 ml-2`}
            >
              {isNegative ? (
                <BsArrowDownRightCircle className="h-3 w-3 text-[#FF4D4F]" />
              ) : (
                <BsArrowUpRightCircle className="h-3 w-3 text-[#42BE65]" />
              )}
          <p className={`text-[10px] font-bold ${isNegative ? "text-[#FF4D4F]" : "text-[#42BE65]"}`}>
  {Math.abs(numericPercentage).toFixed(2)}%
</p>

            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Card