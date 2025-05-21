"use client";

import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/Redux/store";
import { fetch_webhook_url, update_webhook_url } from "@/app/Redux/developer/developerthunk";
import AnimatedLoader from "../animation";
import { KeyInputweb } from "../FormInputs/developerInput";
import CustomizedButton from "../CustomizedButton";

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

  const formik = useFormik({
    initialValues: {
      loan_products: getWebhookUrl("loan_product.create"),
      loan_requests: getWebhookUrl("loan_application.create"),
      indicate_interest: getWebhookUrl("loan_application.interest"),
      loan_approval: getWebhookUrl("loan_application.disbursal"),
      loan_repayments: getWebhookUrl("loan_repayment.initiate"),
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await dispatch(update_webhook_url(values)).unwrap();
        // Refresh webhook URLs after successful update
        dispatch(fetch_webhook_url());
      } catch (error) {
        console.error("Failed to update webhook URLs:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Update form values when webhooks data loads
  useEffect(() => {
    if (webhooks) {
      formik.setValues({
        loan_products: getWebhookUrl("loan_product.create"),
        loan_requests: getWebhookUrl("loan_application.create"),
        indicate_interest: getWebhookUrl("loan_application.interest"),
        loan_approval: getWebhookUrl("loan_application.disbursal"),
        loan_repayments: getWebhookUrl("loan_repayment.initiate"),
      });
    }
  }, [webhooks]);

  if (loading) return <AnimatedLoader isLoading={loading}/>;
  if (error) return <div>Error loading webhooks</div>;

  return (
    <div className="px-6 pt-6 pb-[93px] bg-white rounded-lg max-w-[822px] max-h-screen border">
      <div>
        <p className="font-semibold text-[20px] leading-[24px] tracking-[-0.5px] text-[#333333] mb-6">
          Webhook URLs
        </p>

        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-6 mb-6">
            <KeyInputweb
              label="Loan Product Create"
              placeholder="No URL configured"
              value={formik.values.loan_products}
              onChange={formik.handleChange}
              name="loan_products"
              copyable={true}
            />
            {/* <KeyInputweb
              label="Loan Product Update"
              placeholder="No URL configured"
              value={getWebhookUrl("loan_product.update")}
              name="loan_product_update"
       onChange={formik.handleChange}
              copyable={true}
            /> */}
          </div>
          <div className="space-y-6">
            <KeyInputweb
              label="Loan Application Create"
              placeholder="No URL configured"
              value={formik.values.loan_requests}
              onChange={formik.handleChange}
              name="loan_requests"
              copyable={true}
            />
            <KeyInputweb
              label="Indicate Interest"
              placeholder="No URL configured"
              value={formik.values.indicate_interest}
              onChange={formik.handleChange}
              name="indicate_interest"
              copyable={true}
            />
            <KeyInputweb
              label="Loan Disbursal"
              placeholder="No URL configured"
              value={formik.values.loan_approval}
              onChange={formik.handleChange}
              name="loan_approval"
              copyable={true}
            />
            <KeyInputweb
              label="Loan Repayment"
              placeholder="No URL configured"
              value={formik.values.loan_repayments}
              onChange={formik.handleChange}
              name="loan_repayments"
              copyable={true}
            />
          </div>
             <div className="w-full max-w-[822px] pt-[74px] flex justify-end">
                    <CustomizedButton 
                      text={loading?"processing....":'Save changes'} 

                    />
                  </div>
        </form>
      </div>
    </div>
  );
};

export default Webhook_URLs;