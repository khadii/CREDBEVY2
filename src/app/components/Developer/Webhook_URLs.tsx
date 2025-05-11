"use client";

import React, { useEffect } from "react";
import KeyInput from "../FormInputs/developerInput";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/Redux/store";
import { fetch_webhook_url } from "@/app/Redux/developer/developerthunk";
import AnimatedLoader from "../animation";

const Webhook_URLs = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { webhooks, loading, error } = useSelector((state: any) => state.webhook);
  
  useEffect(() => {
    dispatch(fetch_webhook_url());
  }, [dispatch]);

  // Helper function to find URL by event type
  const getWebhookUrl = (eventType: string) => {
    const webhook = webhooks?.find((wh: any) => wh.event_type === eventType);
    return webhook?.url || "";
  };

  if (loading) return <AnimatedLoader isLoading={loading}/>
  if (error) return <div>Error loading webhooks</div>;

  return (
    <div className="px-6 pt-6 pb-[93px] bg-white rounded-lg max-w-[822px] max-h-screen border">
      <div>
        <p className="font-semibold text-[20px] leading-[24px] tracking-[-0.5px] text-[#333333] mb-6">
          Webhook URLs
        </p>

        <div className="space-y-6 mb-6">
          <KeyInput
            label="Loan Product Create"
            placeholder="No URL configured"
            value={getWebhookUrl("loan_product.create")}
            name="loan_product_create"
            copyable={true}
          />
          <KeyInput
            label="Loan Product Update"
            placeholder="No URL configured"
            value={getWebhookUrl("loan_product.update")}
            name="loan_product_update"
            copyable={true}
          />
        </div>
        <div className="space-y-6">
          <KeyInput
            label="Loan Application Create"
            placeholder="No URL configured"
            value={getWebhookUrl("loan_application.create")}
            name="loan_application_create"
            copyable={true}
          />
          <KeyInput
            label="Indicate Interest"
            placeholder="No URL configured"
            value={getWebhookUrl("loan_application.interest")}
            name="indicate_interest"
            copyable={true}
          />
          <KeyInput
            label="Loan Disbursal"
            placeholder="No URL configured"
            value={getWebhookUrl("loan_application.disbursal")}
            name="loan_disbursal"
            copyable={true}
          />
          <KeyInput
            label="Loan Repayment"
            placeholder="No URL configured"
            value={getWebhookUrl("loan_repayment.initiate")}
            name="loan_repayment"
            copyable={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Webhook_URLs;