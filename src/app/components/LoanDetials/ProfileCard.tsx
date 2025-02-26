'use client';

import { CheckCircle, XCircle } from 'lucide-react';
import { FaRegCheckCircle, FaRegTimesCircle } from 'react-icons/fa';
import ApproveRequest from '../Modals/Approve Request';
import DeclineRequest from '../Modals/DeclineRequest';
import Modal from '../Modals/indicateInterest';
import { useState } from 'react';

const userData = [
  { label: "Date of Birth", value: "Dec. 16, 1999" },
  { label: "Email", value: "Timilehinoripeloye@gmail.com" },
  { label: "Phone", value: "+2349052380387" },
  { label: "Address", value: "10, Lanre Street, Alube Oju,  Yaba, Lagos" },
  { label: "State", value: "Lagos State" },
  { label: "Country", value: "Nigeria" },
  { label: "Gender", value: "Male" },
];

export default function ProfileCard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenApproveRequest, setIsModalOpenApproveRequest] = useState(false);
    const [isModalOpenDeclineRequest, setIsModalOpenDeclineRequest] = useState(false);
  return (
    <div className="bg-[#FFFFFF]  flex flex-col items-center rounded-lg text-center h-[857px] border-[1px]">
       <ApproveRequest isOpen={isModalOpenApproveRequest} onClose={() => setIsModalOpenApproveRequest(false)} />
           <DeclineRequest isOpen={isModalOpenDeclineRequest} onClose={() => setIsModalOpenDeclineRequest(false)} />
           <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} setIsModalOpenApproveRequest={()=>setIsModalOpenApproveRequest(true)} />

      {/* Profile Image */}
      <img
        src="https://bit.ly/dan-abramov"
        alt="User Avatar"
        className="w-24 h-24 mx-auto mb-4 mt-[48px] rounded-full"
      />
      {/* Name */}
      <h2 className="text-2xl font-bold text-[#333333]">Oripeloye Timilehin</h2>

      {/* Buttons */}
      <div className="mt-6 grid justify-center gap-2">
        <div>
          <button className="flex items-center px-[41px] w-full gap-2 h-[36px] bg-[#42BE65] text-white rounded-[4px]" onClick={() => setIsModalOpen(true)}>
            <div>
              <FaRegCheckCircle size={18} />
            </div>
            <p className="text-[12px] font-semibold flex-1">Accept Request</p>
          </button>
        </div>
        <div>
          <button className="flex items-center px-[41px] w-full gap-2 h-[36px] bg-[#FA4D56] text-white rounded-[4px]" onClick={()=>setIsModalOpenDeclineRequest(true)}>
            <div>
              <FaRegTimesCircle size={18} />
            </div>
            <p className="text-[12px] font-semibold flex-1">Decline Request</p>
          </button>
        </div>
      </div>

      {/* Credit Score */}
      <p className="mt-[32px] text-[12px] font-bold text-[#8A8B9F]">Credit Score</p>
      <p className="text-[32px] font-bold text-[#42BE65]">660</p>

      {/* User Details */}
      <div className="w-full space-y-5 mt-[38px] flex flex-col items-center justify-center px-[23px]">
  {userData.map((item, index) => (
    <div
      key={index}
      className="flex w-full text-[12px] font-medium text-[#8A8B9F] text-left gap-[38px]"
    >
      <div className="w-[73px]">{item.label}:</div>
      <div className=" text-left truncate w-[225px] text-pretty break-words">
        <p className={item.label === "Email"  ? "break-words  " : ""}>
          {item.value}
        </p>
      </div>
    </div>
  ))}
</div>

    </div>
  );
}