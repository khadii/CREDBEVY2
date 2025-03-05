"use client"

import { useState } from "react"
import Image from "next/image"
import { Switch } from "../FormInputs/Switch"

interface Integration {
  id: string
  name: string
  icon: string
  description: string
  enabled: boolean
}

export default function IntegrationGrid() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "recova",
      name: "Recova",
      icon: "/placeholder.svg?height=40&width=40",
      description:
        "Recova is a third party recovery agent that has BVN level mandate to recover money for loan companies",
      enabled: true,
    },
    {
      id: "analytica",
      name: "Analytica",
      icon: "/placeholder.svg?height=40&width=40",
      description:
        "Recova is a third party recovery agent that has BVN level mandate to recover money for loan companies",
      enabled: true,
    },
    {
      id: "hellopai",
      name: "HelloPal",
      icon: "/placeholder.svg?height=40&width=40",
      description:
        "Recova is a third party recovery agent that has BVN level mandate to recover money for loan companies",
      enabled: true,
    },
    {
      id: "loanmaster",
      name: "LoanMaster",
      icon: "/placeholder.svg?height=40&width=40",
      description:
        "Recova is a third party recovery agent that has BVN level mandate to recover money for loan companies",
      enabled: false,
    },
    {
      id: "wettstats",
      name: "Wettstats",
      icon: "/placeholder.svg?height=40&width=40",
      description:
        "Recova is a third party recovery agent that has BVN level mandate to recover money for loan companies",
      enabled: false,
    },
    {
      id: "peopleverify",
      name: "People Verify",
      icon: "/placeholder.svg?height=40&width=40",
      description:
        "Recova is a third party recovery agent that has BVN level mandate to recover money for loan companies",
      enabled: false,
    },
    {
      id: "iloans",
      name: "iLoans",
      icon: "/placeholder.svg?height=40&width=40",
      description:
        "Recova is a third party recovery agent that has BVN level mandate to recover money for loan companies",
      enabled: false,
    },
    {
      id: "titian",
      name: "Titian Loans",
      icon: "/placeholder.svg?height=40&width=40",
      description:
        "Recova is a third party recovery agent that has BVN level mandate to recover money for loan companies",
      enabled: false,
    },
    {
      id: "copypaste",
      name: "CopyPaste",
      icon: "/placeholder.svg?height=40&width=40",
      description:
        "Recova is a third party recovery agent that has BVN level mandate to recover money for loan companies",
      enabled: false,
    },
  ])

  const handleToggle = (id: string) => {
    setIntegrations((prev) =>
      prev.map((integration) =>
        integration.id === id ? { ...integration, enabled: !integration.enabled } : integration,
      ),
    )
  }

  return (
    <div className="max-w-4xl pb-[120px]">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 ">
        {integrations.map((integration) => (
          <div key={integration.id} className="bg-white rounded-lg border border-gray-100 flex flex-col pt-[16px]">
            <div className="flex flex-col items-start  mb-4 px-[16px]" >
              <div className="relative h-10 w-10 rounded-[4px] overflow-hidden bg-gray-100 mb-[24px] ">
                <Image
                  src={integration.icon || "/placeholder.svg"}
                  alt={`${integration.name} icon`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-full items-start mb-[34px]">
                <h3 className="text-[14px] font-bold text-[#333333]">{integration.name}</h3>
                <p className="text-xs text-[#8A8B9F] font-medium mt-[16px]  ">{integration.description}</p>
              </div>
            </div>
            <div className="mt-auto pt-[16px] pb-[16px] flex items-center justify-between  border-t border-gray-100">
              <span className="text-xs text-[#8A8B9F] px-[16px] font-bold ">manage</span>
             <div className="px-[16px]"><Switch checked={integration.enabled} onCheckedChange={() => handleToggle(integration.id)} /></div> 
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

