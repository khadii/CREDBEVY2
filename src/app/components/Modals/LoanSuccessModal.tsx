'use client'

import { X, Check } from "lucide-react"
import { useState } from "react"

export default function LoanSuccessModal({open, setOpen,setState}:{open:any, setOpen:any,setState:any}) {
//   const [open, setOpen] = useState(true)

  if (!open) return null

  return (
    // <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-3xl font-bold text-gray-800">Indicate Interest</h2>
          <button
            onClick={() => setOpen(false)}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center justify-center py-10 px-6 space-y-6">
          <div className="w-20 h-20 rounded-full bg-teal-50 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-4 border-teal-700 flex items-center justify-center">
              <Check className="h-8 w-8 text-teal-700" />
            </div>
          </div>

          <div className="text-center space-y-2">
            <h3 className="text-2xl font-semibold text-gray-800">Indication of Interest Successful</h3>
            <p className="text-gray-500">You now have full access to the borrower info</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between gap-4 px-6 pb-6">
          <button
            onClick={() => setOpen(false)}
            className="w-full border border-gray-300 text-gray-700 rounded-lg py-4 text-base hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            className="w-full bg-teal-700 hover:bg-teal-800 text-white rounded-lg py-4 text-base"
          >
            Indicate Interest
          </button>
        </div>
      </div>
    // </div>
  )
}
