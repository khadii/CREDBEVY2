"use client"

import { PencilLine } from "lucide-react"
import { useState } from "react"
import { FaCheckCircle, FaEdit } from "react-icons/fa"

type PaymentCard = {
  id: string
  type: "visa" | "mastercard"
  lastFour: string
  expiryDate: string
  selected?: boolean
}

export default function PaymentMethodSelection() {
  const [cards, setCards] = useState<PaymentCard[]>([
    { id: "1", type: "visa", lastFour: "8974", expiryDate: "12/24", selected: true },
    { id: "2", type: "mastercard", lastFour: "8974", expiryDate: "12/24" },
    { id: "3", type: "visa", lastFour: "8974", expiryDate: "12/24" },
  ])

  const selectCard = (id: string) => {
    setCards(
      cards.map((card) => ({
        ...card,
        selected: card.id === id,
      })),
    )
  }

  return (
    <div className="max-w-4xl min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[26px]">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`relative rounded-[4px] border p-4 cursor-pointer transition-all ${
              card.selected
                ? "bg-[#24262D] text-white border-[#24262D]"
                : "bg-white text-gray-800 border-[#E5EAEF] hover:border-gray-300"
            }`}
            onClick={() => selectCard(card.id)}
          >
            {/* Card Logo */}
            <div className="flex justify-between items-start mb-[42px]">
              <div className="h-[27px] w-[40px] bg-white rounded-[4px] flex items-center justify-center border">
                {card.type === "visa" ? (
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-[10px] w-[32px]" />
                ) : (
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-[14px] w-[32px]" />
                )}
              </div>
              {card.selected && <FaCheckCircle className="h-6 w-6 text-[#156064]" />}
            </div>

            {/* Card Details */}
            <div className="space-y-[36px]">
              <div>
                <p className="text-[10px] font-bold uppercase text-[#8A8B9F]">CARD NUMBER</p>
                <p className={`font-bold text-[14px] ${card.selected?'text-[#FFFFFF]':'text-[#333333]'} `}>**** **** **** {card.lastFour}</p>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[10px] text-[#8A8B9F] font-bold uppercase ">EXPIRY DATE</p>
                  <p className={`font-bold text-[14px] ${card.selected?'text-[#FFFFFF]':'text-[#333333]'} `}>{card.expiryDate}</p>
                </div>

                <button
                  className={`flex  text-xs text-[] font-semibold items-center gap-1 px-3 py-1 rounded border ${
                    card.selected
                      ? "border-[#E5EAEF] text-[#E5EAEF]"
                      : "border-[#8A8B9F] text-[#8A8B9F]"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()

                  }}
                >
                  <PencilLine className="h-4 w-4" />
                  <span>Edit</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}