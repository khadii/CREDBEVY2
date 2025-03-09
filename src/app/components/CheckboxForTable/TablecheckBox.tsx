import { Check } from "lucide-react";

export const CustomCheckbox = ({ id, checked, onChange }: { id: number; checked: boolean; onChange: (id: number) => void }) => {
    return (
      <div 
        className={`w-4 h-4 rounded-md flex items-center justify-center cursor-pointer ${checked ? 'bg-[#156064]' : 'border-2 border-gray-300'}`}
        onClick={() => onChange(id)}
      >
        {checked && <Check size={12} color="white" />}
      </div>
    );
  };