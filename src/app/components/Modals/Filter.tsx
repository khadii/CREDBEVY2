import { useDashboard } from "@/app/Context/DahboardContext";
import { X, Calendar } from "lucide-react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text";
  placeholder?: string;
  className?: string;
}

interface DateInputFieldProps {
  label: string;
  selected: Date | null;
  onChange: (date: Date | null) => void;
  className?: string;
}

const InputField = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  className = "",
}: InputFieldProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Simple direct input handling without special formatting
    onChange(e.target.value);
  };

  return (
    <div className={className}>
      <label className="block text-[12px] text-[#333333] font-semibold mb-1">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full px-3 h-[44px] border border-gray-300 rounded-[4px] focus:ring-0 focus:outline-none"
      />
    </div>
  );
};

const DateInputField = ({
  label,
  selected,
  onChange,
  className = "",
}: DateInputFieldProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className={className}>
      <label className="block text-[12px] text-[#333333] font-semibold mb-1">
        {label}
      </label>
      <div className="relative">
        <DatePicker
          selected={selected}
          onChange={(date) => {
            onChange(date);
            setIsOpen(false);
          }}
          open={isOpen}
          onClickOutside={() => setIsOpen(false)}
          customInput={
            <input
              type="text"
              value={formatDate(selected)}
              readOnly
              className="w-full px-3 h-[44px] border border-gray-300 rounded-[4px] pr-10 cursor-pointer focus:ring-0 focus:outline-none"
              onClick={() => setIsOpen(true)}
            />
          }
        />
        <div
          className="absolute right-3 top-3 text-gray-400 cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <Calendar size={20} />
        </div>
      </div>
    </div>
  );
};

export default function FilterModal() {
  // Initialize all state with empty values
  const { filter, setFilter } = useDashboard();
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [minIncome, setMinIncome] = useState("");
  const [maxIncome, setMaxIncome] = useState("");
  const [minRequested, setMinRequested] = useState("");
  const [maxRequested, setMaxRequested] = useState("");
  const [minCreditScore, setMinCreditScore] = useState("");
  const [maxCreditScore, setMaxCreditScore] = useState("");

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if clicking directly on the overlay, not its children
    if (e.target === e.currentTarget) {
      setFilter(false);
    }
  };

  const handleClearFilter = () => {
    // Reset all values to empty
    setFromDate(null);
    setToDate(null);
    setMinIncome("");
    setMaxIncome("");
    setMinRequested("");
    setMaxRequested("");
    setMinCreditScore("");
    setMaxCreditScore("");
    setFilter(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#17191CBA]"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg w-full max-w-[343px]">
        <div className="flex justify-between bg-[#F1F6FB] items-center py-[13px] px-[15px] rounded-t-lg border-b">
          <h2 className="text-[14px] font-medium text-[#333333]">Filter</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => setFilter(false)}
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-[15px] py-5 space-y-[20px]">
          {/* Date Selection */}
          <div>
            <h3 className="text-sm font-semibold text-[#8A8B9F] mb-[12px]">
              Select Date
            </h3>
            <div className="flex gap-4">
              <DateInputField
                label="From:"
                selected={fromDate}
                onChange={setFromDate}
                className="w-1/2"
              />
              <DateInputField
                label="To:"
                selected={toDate}
                onChange={setToDate}
                className="w-1/2"
              />
            </div>
          </div>

          {/* Average Income */}
          <div>
            <h3 className="text-sm font-semibold text-[#8A8B9F] mb-[12px]">
              Average Income
            </h3>
            <div className="flex gap-4">
              <InputField
                label="Min Amount:"
                value={minIncome}
                onChange={setMinIncome}
                placeholder="₦200,000.00"
                className="w-1/2"
              />
              <InputField
                label="Max Amount:"
                value={maxIncome}
                onChange={setMaxIncome}
                placeholder="₦200,000.00"
                className="w-1/2"
              />
            </div>
          </div>

          {/* Amount Requested */}
          <div>
            <h3 className="text-sm font-semibold text-[#8A8B9F] mb-[12px]">
              Amount Requested
            </h3>
            <div className="flex gap-4">
              <InputField
                label="Min Amount:"
                value={minRequested}
                onChange={setMinRequested}
                placeholder="₦200,000.00"
                className="w-1/2"
              />
              <InputField
                label="Max Amount:"
                value={maxRequested}
                onChange={setMaxRequested}
                placeholder="₦200,000.00"
                className="w-1/2"
              />
            </div>
          </div>

          {/* Credit Score */}
          <div>
            <h3 className="text-sm font-semibold text-[#8A8B9F] mb-[12px]">
              Credit Score
            </h3>
            <div className="flex gap-4">
              <InputField
                label="Min Amount:"
                value={minCreditScore}
                onChange={setMinCreditScore}
                placeholder="0"
                className="w-1/2"
              />
              <InputField
                label="Max Amount:"
                value={maxCreditScore}
                onChange={setMaxCreditScore}
                placeholder="850"
                className="w-1/2"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex px-4 py-[30px]">
          <button
            className="flex-1 h-[36px] mr-2 border border-gray-300 rounded-[4px] text-[12px] font-semibold"
            onClick={handleClearFilter}
          >
            Cancel
          </button>
          <button
            className="flex-1 h-[36px] ml-2 bg-[#156064] text-white text-[12px] rounded-[4px] font-semibold"
            onClick={() => setFilter(false)}
          >
            Apply Filter
          </button>
        </div>
      </div>
    </div>
  );
}
