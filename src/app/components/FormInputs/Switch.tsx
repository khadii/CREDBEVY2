"use client"

import * as React from "react"

interface SwitchProps extends React.HTMLAttributes<HTMLDivElement> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
}

export const Switch = React.forwardRef<HTMLDivElement, SwitchProps>(
  ({ checked = false, onCheckedChange, disabled = false, className, ...props }, ref) => {
    const handleClick = () => {
      if (!disabled && onCheckedChange) {
        onCheckedChange(!checked)
      }
    }

    return (
      <div
        ref={ref}
        role="switch"
        aria-checked={checked}
        data-state={checked ? "checked" : "unchecked"}
        aria-disabled={disabled}
        onClick={handleClick}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors 
          ${checked ? "bg-[#156064]" : "bg-gray-200"} 
          ${disabled ? "cursor-not-allowed opacity-50" : ""} 
          ${className}`}
        {...props}
      >
        <span
          className={`pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform
            ${checked ? "translate-x-5" : "translate-x-1"}`}
        />
      </div>
    )
  },
)

Switch.displayName = "Switch"
