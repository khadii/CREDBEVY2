'use client';

import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputFieldPassword from '../FormInputs/InputFieldPassword';
import CustomizedButton from '../CustomizedButton';
import ToggleButton from '../FormInputs/ToggleButton';
import { resetSecurityState } from '@/app/Redux/company_info/security&password';
import { fetchCompanyInfo, security } from '@/app/Redux/company_info/company_info_thunk';
import { AppDispatch, RootState } from '@/app/Redux/store';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const SecuritySettings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const securityState = useSelector((state: any) => state.security);
 const { loading:comploading, error:comperror, data:compandata } = useSelector(
    (state: RootState) => state.companyInfo
  );

    useEffect(() => {
      dispatch(fetchCompanyInfo());
    }, [dispatch]);
  const companyData = compandata as {
    user_two_fa?:any
    // loading?:any
  }
  const [twoFactorEnabled, setTwoFactorEnabled] = useState<boolean>(companyData?.user_two_fa);
  
  // Handle toast notifications
  useEffect(() => {
    if (securityState.success) {
      toast.success(securityState.message);
      dispatch(resetSecurityState());
      console.log({user_two_fa:companyData?.user_two_fa })
      dispatch(fetchCompanyInfo());
    }
    if (securityState.error) {
      toast.error(securityState.error);
      dispatch(resetSecurityState());
      dispatch(fetchCompanyInfo());
      console.log({user_two_fa:companyData?.user_two_fa })
    }
  }, [securityState.success, securityState.error, dispatch]);

  const passwordFormik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required('Current password is required'),
      newPassword: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('New password is required'),
      confirmNewPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'Passwords must match')
        .required('Please confirm your new password'),
    }),
    onSubmit: (values) => {
      const Security = {
        current_password: values.currentPassword,
        new_password: values.newPassword,
        new_password_confirmation: values.confirmNewPassword,
        two_fa: twoFactorEnabled,
      };
      dispatch(security(Security));
    },
  });

  const handleToggleTwoFactor = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission
    e.stopPropagation(); // Stop event bubbling
    setTwoFactorEnabled(!twoFactorEnabled);
  };
  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if password fields are empty
    const passwordFieldsEmpty = 
      !passwordFormik.values.currentPassword && 
      !passwordFormik.values.newPassword && 
      !passwordFormik.values.confirmNewPassword;
    
    // If password fields are empty
    if (passwordFieldsEmpty) {
      const Security = {
        two_fa: twoFactorEnabled,
      };
      dispatch(resetSecurityState());
      dispatch(security(Security));
    } else {
      // Otherwise validate and submit the full form
      dispatch(resetSecurityState());
      passwordFormik.handleSubmit();
    }
  };

  return (
    <form onSubmit={handleSaveChanges} className="max-w-[822px] min-h-screen pb-[76px]">
      {/* Password Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h2 className="text-[20px] font-bold text-[#333333] mb-6">Password</h2>
        <div className="space-y-6">
          {/* Current Password */}
          <InputFieldPassword
            label="Current Password"
            placeholder="Current Password"
            value={passwordFormik.values.currentPassword}
            onChange={passwordFormik.handleChange}
            error={passwordFormik.touched.currentPassword && passwordFormik.errors.currentPassword}
            required
            name="currentPassword"
          />

          {/* New Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputFieldPassword
              label="New Password"
              placeholder="New Password"
              value={passwordFormik.values.newPassword}
              onChange={passwordFormik.handleChange}
              error={passwordFormik.touched.newPassword && passwordFormik.errors.newPassword}
              required
              name="newPassword"
            />

            {/* Confirm New Password */}
            <InputFieldPassword
              label="Confirm New Password"
              placeholder="Confirm New Password"
              value={passwordFormik.values.confirmNewPassword}
              onChange={passwordFormik.handleChange}
              error={passwordFormik.touched.confirmNewPassword && passwordFormik.errors.confirmNewPassword}
              required
              name="confirmNewPassword"
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
            <p className="text-[12px] font-bold text-[#8A8B9F] mb-[40px]">
              Make your account extra secure. Along with the password, you will need a code
            </p>
          </div>
          
        <ToggleButton isEnabled={twoFactorEnabled} onToggle={handleToggleTwoFactor}  type='button'/>
        </div>
        
        <div className="space-y-6 pb-[62px]">
          <p className="flex items-start">
            <span className="text-[#156064] mr-2 text-[14px] font-extrabold">*</span>
            <span className="font-semibold text-[12px] text-[#8A8B9F] italic">
              If you encounter any security issues or suspect unauthorized access to your account, please report it to our customer support or security team immediately. 
              Provide as much detail as possible, and we'll investigate promptly. We may need to temporarily disable your account while we investigate. Contact us with any 
              questions or concerns. Thanks for helping keep our platform secure!
            </span>
          </p>
          
          <p className="flex items-start">
            <span className="text-[#156064] font-extrabold mr-2">*</span>
            <span className="font-semibold text-[12px] text-[#8A8B9F] italic">
              We take the security and privacy of your data seriously, including when it's shared with third-party services. We only share necessary information, and have 
              strict policies to ensure your data is protected and used only for the intended purpose. If you have questions or concerns about third-party access, please 
              contact our customer support team.
            </span>
          </p>
          
          <p className="flex items-start">
            <span className="text-[#156064] font-extrabold mr-2">*</span>
            <span className="font-semibold text-[12px] text-[#8A8B9F] italic">
              Use a secure device and browser when accessing our platform. Keep your operating system and browser up-to-date, use strong and unique passwords, and 
              enable two-factor authentication. Avoid using public or shared devices to access your account. Contact our customer support team with any questions or 
              concerns about device and browser security.
            </span>
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <div className="w-full max-w-[822px] pt-[24px] flex justify-end">
        <CustomizedButton 
          text={securityState.loading?"saving changes....":"Save changes" }
        />
      </div>
    </form>
  );
};

export default SecuritySettings;