"use client"

import { useEffect, useRef } from "react"
import { Trash2 } from "lucide-react"
import { Switch } from "../FormInputs/ToggleButton_Small"

interface ModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  isActivated: boolean
  setIsActivated: (isActivated: boolean) => void
}

export default function ToggleActions({ isOpen, setIsOpen, isActivated, setIsActivated }: ModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [setIsOpen])

  if (!isOpen) return null

  return (
    <div className="max-w-[166px] mx-auto p-6 space-y-8" ref={modalRef}>
      {/* Toggle for Activate/Deactivate */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Switch
            checked={isActivated}
            onCheckedChange={(checked) => setIsActivated(checked)}
          />
          <span className="text-3xl font-medium text-zinc-800">
            {isActivated ? "Activated" : "Deactivated"}
          </span>
        </div>
      </div>

      {/* Delete Button */}
      <div className="flex items-center justify-between pt-4">
        <div className="flex items-center gap-4">
          <button
            className="text-red-500 p-1"
            onClick={() => {
              // Add delete logic here
              console.log("Item deleted")
            }}
            aria-label="Delete"
          >
            <Trash2 size={28} />
          </button>
          <span className="text-3xl font-medium text-red-500">Delete</span>
        </div>
      </div>
    </div>
  )
}