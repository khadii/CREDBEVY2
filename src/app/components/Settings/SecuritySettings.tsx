"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputField from "../FormInputs/iputDetails";
import CustomizedButton from "../CustomizedButton";

const SecuritySettings = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const passwordFormik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required("Current password is required"),
      newPassword: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("New password is required"),
      confirmNewPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Passwords must match")
        .required("Please confirm your new password"),
    }),
    onSubmit: (values) => {
      console.log("Password change submitted:", values);
      // Add API call to change password here
    },
  });

  const handleToggleTwoFactor = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    // In a real app, you would make an API call to enable/disable 2FA
  };

  const handleSaveChanges = () => {
    passwordFormik.handleSubmit();
    // You could add additional save logic here if needed
  };

  return (
    <div className="max-w-[822px] min-h-screen pb-[76px]">
      {/* Password Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h2 className="text-[20px] font-bold text-[#333333] mb-6">Password</h2>
        
        <div className="space-y-6">
          {/* Current Password */}
          <InputField
            label="Current Password"
            placeholder="Current Password"
            type="password"
           
            value={passwordFormik.values.currentPassword}
            onChange={passwordFormik.handleChange}
          
            error={passwordFormik.touched.currentPassword && passwordFormik.errors.currentPassword}
            required
          />
          
          {/* New Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="New Password"
              placeholder="New Password"
              type="password"
            
              value={passwordFormik.values.newPassword}
              onChange={passwordFormik.handleChange}
          
              error={passwordFormik.touched.newPassword && passwordFormik.errors.newPassword}
              required
            />
            
            {/* Confirm New Password */}
            <InputField
              label="Confirm New Password"
              placeholder="Confirm New Password"
              type="password"
             
              value={passwordFormik.values.confirmNewPassword}
              onChange={passwordFormik.handleChange}
           
              error={passwordFormik.touched.confirmNewPassword && passwordFormik.errors.confirmNewPassword}
              required
            />
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
      <h2 className="text-[20px] font-bold text-[#333333] mb-6">Security</h2>
        
        <div className="flex justify-between items-center mb-2">
          <div>
            <h3 className="text-[14px] font-bold text-[#333333] mb-1">2-Step Verification</h3>
            <p className="text-[12px] font-bold text-[#8A8B9F] mb-[40px]">Make your account extra secure. Along with the password, you will need a code</p>
          </div>
          
          <button 
            onClick={handleToggleTwoFactor}
            className={`w-12 h-6 flex items-center rounded-full p-1 ${twoFactorEnabled ? 'bg-[#156064]' : 'bg-gray-300'}`}
          >
            <div className={`bg-white w-4 h-4 rounded-full transform duration-300 ease-in-out ${twoFactorEnabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
          </button>
        </div>
        
        <div className="space-y-6 pb-[62px]">
          <p className="flex items-start ">
            <span className="text-[#156064] mr-2 text-[14px] font-extrabold">*</span>
            <span className="font-semibold  text-[12px] text-[#8A8B9F] italic ">
              If you encounter any security issues or suspect unauthorized access to your account, please report it to our customer support or security team immediately. 
              Provide as much detail as possible, and we'll investigate promptly. We may need to temporarily disable your account while we investigate. Contact us with any 
              questions or concerns. Thanks for helping keep our platform secure!
            </span>
          </p>
          
          <p className="flex items-start">
            <span className="text-[#156064] font-extrabold mr-2">*</span>
            <span className="font-semibold text-[12px] text-[#8A8B9F] italic ">
              We take the security and privacy of your data seriously, including when it's shared with third-party services. We only share necessary information, and have 
              strict policies to ensure your data is protected and used only for the intended purpose. If you have questions or concerns about third-party access, please 
              contact our customer support team.
            </span>
          </p>
          
          <p className="flex items-start">
            <span className="text-[#156064] font-extrabold  mr-2">*</span>
            <span className="font-semibold text-[12px] text-[#8A8B9F] italic ">
              Use a secure device and browser when accessing our platform. Keep your operating system and browser up-to-date, use strong and unique passwords, and 
              enable two-factor authentication. Avoid using public or shared devices to access your account. Contact our customer support team with any questions or 
              concerns about device and browser security.
            </span>
          </p>
        </div>
      </div>
      
      {/* Submit Button */}
             <div className="w-full max-w-[822px] pt-[24px] flex justify-end ">
               <CustomizedButton text={'Save changes'} />
             </div>
    </div>
  );
};

export default SecuritySettings;