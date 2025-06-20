import { FaCircle } from 'react-icons/fa';

const StatusWithOptionsCustomers = ({
  status,
}: {
  status: 'Active' | 'Repaid' | 'Overdue';
}) => {
  let bgColor = '';
  let textColor = '';
  let dotColor = '';

  switch (status) {
    case 'Active':
      bgColor = 'bg-yellow-100';
      textColor = 'text-yellow-500';
      dotColor = '#FBBF24'; // Tailwind yellow-400
      break;
    case 'Repaid':
      bgColor = 'bg-green-100';
      textColor = 'text-green-500';
      dotColor = '#10B981'; // Tailwind green-500
      break;
    case 'Overdue':
      bgColor = 'bg-red-100';
      textColor = 'text-red-500';
      dotColor = '#EF4444'; // Tailwind red-500
      break;
    default:
      bgColor = 'bg-gray-100';
      textColor = 'text-gray-500';
      dotColor = '#9CA3AF'; // Tailwind gray-400
  }

  return (
    <div className="flex items-center space-x-[18px] relative">
      <button
        className={`flex items-center border px-2 h-[23px] rounded-full text-xs font-semibold ${bgColor} ${textColor}`}
      >
        <FaCircle className="w-2 h-2 mr-1" style={{ color: dotColor }} />
        {status}
      </button>

      {/* Placeholder for future options dropdown */}
      {/* <div>
        <SlOptionsVertical
          color="#8A8B9F"
          onClick={handleOptionsClick}
          className="cursor-pointer hover:opacity-80"
        />
        {isActive && (
          <div className="absolute right-10 z-10">
            <DropdownMenu
              onClick={(e) => e.stopPropagation()}
              productId={uuid}
              setActiveDropdown={setActiveDropdown}
            />
          </div>
        )}
      </div> */}
    </div>
  );
};

export default StatusWithOptionsCustomers;
