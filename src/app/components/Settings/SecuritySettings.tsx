'use client';

import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputFieldPassword, { InputFieldPin } from '../FormInputs/InputFieldPassword';
import CustomizedButton from '../CustomizedButton';
import { AppDispatch, RootState } from '@/app/Redux/store';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { resetPasswordUpdateState, selectPasswordUpdateError, selectPasswordUpdateLoading, selectPasswordUpdateSuccess } from '@/app/Redux/PasswordReset/passWordResetSlice';
import { selectPinError, selectPinLoading, selectPinSuccess } from '@/app/Redux/updatePin/updatePinSlice';
import { updatePasswordWith2FA } from '@/app/Redux/PasswordReset/passwordResetThunk';
import { resetTransactionPin } from '@/app/Redux/updatePin/updatePinthunk';


const SecuritySettings = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  // Password update state
  const passwordLoading = useSelector(selectPasswordUpdateLoading);
  const passwordError = useSelector(selectPasswordUpdateError);
  const passwordSuccess = useSelector(selectPasswordUpdateSuccess);
  
  // PIN reset state
  const pinLoading = useSelector(selectPinLoading);
  const pinError = useSelector(selectPinError);
  const pinSuccess = useSelector(selectPinSuccess);

  // Handle toast notifications for password update
  useEffect(() => {
    if (passwordSuccess) {
      toast.success('Password updated successfully');
      dispatch(resetPasswordUpdateState());
    }
    if (passwordError) {
      toast.error(passwordError);
      dispatch(resetPasswordUpdateState());
    }
  }, [passwordSuccess, passwordError, dispatch]);

  // Handle toast notifications for PIN reset
  useEffect(() => {
    if (pinSuccess) {
      toast.success('Transaction PIN reset successfully');
      dispatch(resetPasswordUpdateState());
    }
    if (pinError) {
      toast.error(pinError);
      dispatch(resetPasswordUpdateState());
    }
  }, [pinSuccess, pinError, dispatch]);

  // Password Form
  const passwordFormik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      two_fa: false,
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required('Current password is required'),
      newPassword: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
  'Password must contain at least one uppercase, one lowercase, one number, and one special character'
)

        .required('New password is required'),
      confirmNewPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'Passwords must match')
        .required('Please confirm your new password'),
    }),
    onSubmit: (values) => {
      dispatch(updatePasswordWith2FA({
        current_password: values.currentPassword,
        new_password: values.newPassword,
        new_password_confirmation: values.confirmNewPassword,
        two_fa: values.two_fa
      }));
    },
  });

  // PIN Form
  const pinFormik = useFormik({
    initialValues: {
      currentPin: '',
      newPin: '',
      confirmNewPin: '',
    },
    validationSchema: Yup.object({
      currentPin: Yup.string()
        .matches(/^\d{4}$/, 'PIN must be exactly 4 digits')
        .required('Current PIN is required'),
      newPin: Yup.string()
        .matches(/^\d{4}$/, 'PIN must be exactly 4 digits')
        .notOneOf([Yup.ref('currentPin')], 'New PIN must be different from current PIN')
        .required('New PIN is required'),
      confirmNewPin: Yup.string()
        .oneOf([Yup.ref('newPin')], 'PINs must match')
        .required('Please confirm your new PIN'),
    }),
    onSubmit: (values) => {
      dispatch(resetTransactionPin({
        old_pin: Number(values.currentPin),
        new_pin: Number(values.newPin),
        confirm_pin: Number(values.confirmNewPin)
      }));
    },
  });

  return (
    <div className="max-w-[822px] min-h-screen pb-[76px] space-y-6">
      {/* Password Section */}
      <form onSubmit={passwordFormik.handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-[20px] font-bold text-[#333333] mb-6">Reset Login Password</h2>
        <div className="space-y-6">
          <InputFieldPassword
            label="Current Password"
            placeholder="Current Password"
            value={passwordFormik.values.currentPassword}
            onChange={passwordFormik.handleChange}
            error={passwordFormik.touched.currentPassword && passwordFormik.errors.currentPassword}
            required
            name="currentPassword"
          />

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

        <div className="w-full pt-6 flex justify-end">
          <CustomizedButton 
            // type="submit"
            text={passwordLoading ? "Updating..." : "Update Password"}
            // disabled={passwordLoading}
          />
        </div>
      </form>

      {/* PIN Section */}
      <form onSubmit={pinFormik.handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-[20px] font-bold text-[#333333] mb-6">Reset Transaction PIN</h2>
        <div className="space-y-6">
          <InputFieldPin
            label="Current PIN"
            placeholder="Current 4-digit PIN"
            value={pinFormik.values.currentPin}
            onChange={pinFormik.handleChange}
            error={pinFormik.touched.currentPin && pinFormik.errors.currentPin}
            required
            name="currentPin"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputFieldPin
              label="New PIN"
              placeholder="New 4-digit PIN"
              value={pinFormik.values.newPin}
              onChange={pinFormik.handleChange}
              error={pinFormik.touched.newPin && pinFormik.errors.newPin}
              required
              name="newPin"
            />

            <InputFieldPin
              label="Confirm New PIN"
              placeholder="Confirm 4-digit PIN"
              value={pinFormik.values.confirmNewPin}
              onChange={pinFormik.handleChange}
              error={pinFormik.touched.confirmNewPin && pinFormik.errors.confirmNewPin}
              required
              name="confirmNewPin"
            />
          </div>
        </div>

        <div className="w-full pt-6 flex justify-end">
          <CustomizedButton 
            // type="submit"
            text={pinLoading ? "Updating..." : "Update PIN"}
            // disabled={pinLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default SecuritySettings;






























// implement both here 'use client';

// import React, { useState, useEffect } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import InputFieldPassword, { InputFieldPin } from '../FormInputs/InputFieldPassword';
// // import InputFieldPin from '../FormInputs/InputFieldPin';
// import CustomizedButton from '../CustomizedButton';
// import ToggleButton from '../FormInputs/ToggleButton';
// import { resetSecurityState } from '@/app/Redux/company_info/security&password';
// import { fetchCompanyInfo, security } from '@/app/Redux/company_info/company_info_thunk';
// import { AppDispatch, RootState } from '@/app/Redux/store';
// import { useDispatch, useSelector } from 'react-redux';
// import toast from 'react-hot-toast';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';

// interface InputFieldPinProps {
//   label: string;
//   placeholder: string;
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   required?: boolean;
//   error?: string;
//   name: string;
// }

// const SecuritySettings = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const securityState = useSelector((state: any) => state.security);
//   const { loading: comploading, error: comperror, data: compandata } = useSelector(
//     (state: RootState) => state.companyInfo
//   );

//   useEffect(() => {
//     dispatch(fetchCompanyInfo());
//   }, [dispatch]);

//   const companyData = compandata as {
//     user_two_fa?: any
//   }
//   const [twoFactorEnabled, setTwoFactorEnabled] = useState<boolean>(companyData?.user_two_fa);
  
//   // Handle toast notifications
//   useEffect(() => {
//     if (securityState.success) {
//       toast.success(securityState.message);
//       dispatch(resetSecurityState());
//       dispatch(fetchCompanyInfo());
//     }
//     if (securityState.error) {
//       toast.error(securityState.error);
//       dispatch(resetSecurityState());
//       dispatch(fetchCompanyInfo());
//     }
//   }, [securityState.success, securityState.error, dispatch]);

//   // Password Form
//   const passwordFormik = useFormik({
//     initialValues: {
//       currentPassword: '',
//       newPassword: '',
//       confirmNewPassword: '',
//     },
//     validationSchema: Yup.object({
//       currentPassword: Yup.string().required('Current password is required'),
//       newPassword: Yup.string()
//         .min(8, 'Password must be at least 8 characters')
//         .required('New password is required'),
//       confirmNewPassword: Yup.string()
//         .oneOf([Yup.ref('newPassword')], 'Passwords must match')
//         .required('Please confirm your new password'),
//     }),
//     onSubmit: (values) => {
//       const Security = {
//         current_password: values.currentPassword,
//         new_password: values.newPassword,
//         new_password_confirmation: values.confirmNewPassword,
//         two_fa: twoFactorEnabled,
//       };
//       dispatch(security(Security));
//     },
//   });

//   // PIN Form
//   const pinFormik = useFormik({
//     initialValues: {
//       currentPin: '',
//       newPin: '',
//       confirmNewPin: '',
//     },
//     validationSchema: Yup.object({
//       currentPin: Yup.string()
//         .matches(/^\d{4}$/, 'PIN must be exactly 4 digits')
//         .required('Current PIN is required'),
//       newPin: Yup.string()
//         .matches(/^\d{4}$/, 'PIN must be exactly 4 digits')
//         .notOneOf([Yup.ref('currentPin')], 'New PIN must be different from current PIN')
//         .required('New PIN is required'),
//       confirmNewPin: Yup.string()
//         .oneOf([Yup.ref('newPin')], 'PINs must match')
//         .required('Please confirm your new PIN'),
//     }),
//     onSubmit: (values) => {
//       // Add your PIN update logic here
//       console.log('Updating PIN:', values);
//       toast.success('PIN updated successfully');
//     },
//   });

//   const handleToggleTwoFactor = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setTwoFactorEnabled(!twoFactorEnabled);
//   };

//   const handleSaveChanges = (e: React.FormEvent) => {
//     e.preventDefault();
//     const Security = {
//       two_fa: twoFactorEnabled,
//     };
//     dispatch(resetSecurityState());
//     dispatch(security(Security));
//   };

//   return (
//     <div className="max-w-[822px] min-h-screen pb-[76px] space-y-6">
//       {/* Password Section */}
//       <form onSubmit={passwordFormik.handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6">
//         <h2 className="text-[20px] font-bold text-[#333333] mb-6">Password</h2>
//         <div className="space-y-6">
//           <InputFieldPassword
//             label="Current Password"
//             placeholder="Current Password"
//             value={passwordFormik.values.currentPassword}
//             onChange={passwordFormik.handleChange}
//             error={passwordFormik.touched.currentPassword && passwordFormik.errors.currentPassword}
//             required
//             name="currentPassword"
//           />

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <InputFieldPassword
//               label="New Password"
//               placeholder="New Password"
//               value={passwordFormik.values.newPassword}
//               onChange={passwordFormik.handleChange}
//               error={passwordFormik.touched.newPassword && passwordFormik.errors.newPassword}
//               required
//               name="newPassword"
//             />

//             <InputFieldPassword
//               label="Confirm New Password"
//               placeholder="Confirm New Password"
//               value={passwordFormik.values.confirmNewPassword}
//               onChange={passwordFormik.handleChange}
//               error={passwordFormik.touched.confirmNewPassword && passwordFormik.errors.confirmNewPassword}
//               required
//               name="confirmNewPassword"
//             />
//           </div>
//         </div>

//         <div className="w-full pt-6 flex justify-end">
//           <CustomizedButton 
//             // type="submit"
//             text={securityState.loading ? "Updating password..." : "Update Password"}
//             // disabled={securityState.loading}
//           />
//         </div>
//       </form>

//       {/* PIN Section */}
//       <form onSubmit={pinFormik.handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6">
//         <h2 className="text-[20px] font-bold text-[#333333] mb-6">Reset PIN</h2>
//         <div className="space-y-6">
//           <InputFieldPin
//             label="Current PIN"
//             placeholder="Current 4-digit PIN"
//             value={pinFormik.values.currentPin}
//             onChange={pinFormik.handleChange}
//             error={pinFormik.touched.currentPin && pinFormik.errors.currentPin}
//             required
//             name="currentPin"
//           />
{/* 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputFieldPin
              label="New PIN"
              placeholder="New 4-digit PIN"
              value={pinFormik.values.newPin}
              onChange={pinFormik.handleChange}
              error={pinFormik.touched.newPin && pinFormik.errors.newPin}
              required
              name="newPin"
            />

            <InputFieldPin
              label="Confirm New PIN"
              placeholder="Confirm 4-digit PIN"
              value={pinFormik.values.confirmNewPin}
              onChange={pinFormik.handleChange}
              error={pinFormik.touched.confirmNewPin && pinFormik.errors.confirmNewPin}
              required
              name="confirmNewPin"
            />
          </div>
        </div>

        <div className="w-full pt-6 flex justify-end">
          <CustomizedButton 
            // type="submit"
            text="Update PIN"
          />
        </div>
      </form> */}

      {/* Security Section */}
      {/* <form onSubmit={handleSaveChanges} className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-[20px] font-bold text-[#333333] mb-6">Security</h2>
        <div className="flex justify-between items-center mb-2">
          <div>
            <h3 className="text-[14px] font-bold text-[#333333] mb-1">2-Step Verification</h3>
            <p className="text-[12px] font-bold text-[#8A8B9F] mb-[40px]">
              Make your account extra secure. Along with the password, you will need a code
            </p>
          </div>
          <ToggleButton isEnabled={twoFactorEnabled} onToggle={handleToggleTwoFactor} type="button"/>
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

        <div className="w-full pt-[24px] flex justify-end">
          <CustomizedButton 
            type="submit"
            text={securityState.loading ? "Saving changes..." : "Save Security Settings"}
            disabled={securityState.loading}
          />
        </div>
      </form> */}
//     </div>
//   );
// };

// export default SecuritySettings;