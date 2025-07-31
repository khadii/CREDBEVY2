'use client';

import React, { useState } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import InputFieldPassword from './FormInputs/InputFieldPassword';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import NotificationModal from './Modals/NotificationModal';
import { setPasswordWithToken } from '../Redux/setPassword/setpassword';
import { selectPasswordLoading, selectPasswordError, selectPasswordSuccess } from '../Redux/setPassword/setPassword_slice';
import { AppDispatch } from '../Redux/store';
import toast from 'react-hot-toast';

interface FormValues {
  newPassword: string;
  confirmPassword: string;
}

const WelcomeWizard = ({ token }: { token: any }) => {
  const [step, setStep] = useState(1);
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(selectPasswordLoading);
  const error = useSelector(selectPasswordError);
  const success = useSelector(selectPasswordSuccess);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  // Form validation schema for password reset
  const passwordSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required('New password is required')
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], 'Passwords must match')
      .required('Confirm password is required'),
  });

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, setTouched }: FormikHelpers<FormValues>
  ) => {
    if (step < 2) {
      nextStep();
      setTouched({});
      setSubmitting(false);
    } else if (step === 2) {
      if (!token) {
        toast.error('Token is missing. Please try the password reset link again.');
        return;
      }
      
      try {
        await dispatch(setPasswordWithToken({
          token,
          password: values.newPassword
        })).unwrap();
        
        toast.success('Password set successfully!');
        nextStep();
      } catch (err: any) {
        // console.error('Failed to set password:', err);
        toast.error(error|| 'Failed to set password. Please try again.');
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleLoginRedirect = () => {
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl bg-white rounded-lg border overflow-hidden">
        {/* Progress bar */}
        {step < 3 && (
          <div className="h-1 bg-gray-200">
            <div
              className="h-full bg-[#156064] transition-all duration-300"
              style={{ width: `${(step / 2) * 100}%` }}
            ></div>
          </div>
        )}

        <Formik
          initialValues={{
            newPassword: '',
            confirmPassword: '',
          }}
          validationSchema={step === 2 ? passwordSchema : null}
          onSubmit={handleSubmit}
          validateOnMount={false}
          validateOnChange={true}
          validateOnBlur={true}
        >
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting, isValid, handleSubmit }) => (
            <Form className="px-8 py-6" onSubmit={handleSubmit}>
              {/* Step 1: Welcome */}
              {step === 1 && (
                <div className="text-center py-4">
                  <h2 className="text-3xl font-extrabold text-[#156064] mb-6">Welcome to Credbevy</h2>
                  <p className="text-gray-600 mb-8">
                    We're excited to have you on board. Let's get you set up with a new password.
                  </p>
                </div>
              )}

              {/* Step 2: Reset Password */}
              {step === 2 && (
                <div className='py-2'>
                  <h2 className="text-2xl font-bold text-[#156064] mb-6 text-center">Set Password</h2>
                  <div className="space-y-4">
                    <InputFieldPassword
                      label="Password"
                      placeholder="Enter your new password"
                      value={values.newPassword}
                      onChange={handleChange}
                      error={touched.newPassword && errors.newPassword}
                      required
                      name="newPassword"
                    />
                    <InputFieldPassword
                      label="Confirm Password"
                      placeholder="Confirm your new password"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      error={touched.confirmPassword && errors.confirmPassword}
                      required
                      name="confirmPassword"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Congratulations */}
              {step === 3 && (
                <div className="text-center py-8">
                  <div className="flex justify-center mb-6">
                    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="100" cy="100" r="90" fill="#E6F7F7" />
                      <path d="M80 130L60 110L53 117L80 144L147 77L140 70L80 130Z" fill="#156064" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-extrabold text-[#156064] mb-4">Congratulations!</h2>
                  <p className="text-gray-600 mb-8 text-lg">
                    You're all set to use the Credbevy dashboard.
                  </p>
                  <button
                    type="button"
                    onClick={handleLoginRedirect}
                    className="bg-[#156064] text-white font-medium py-3 px-8 rounded-lg hover:bg-[#0e4a4d] transition-colors text-lg"
                  >
                    Go to Login Page
                  </button>
                </div>
              )}

              {/* Navigation buttons */}
              {step < 3 && (
                <div className="mt-8 flex items-center justify-between">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex items-center text-[#156064] font-medium py-2 px-4 rounded hover:bg-gray-100 transition-colors"
                    >
                      <FaArrowLeft className="mr-2" /> Back
                    </button>
                  ) : (
                    <div></div>
                  )}

                  <div className="flex justify-center space-x-2 flex-grow mx-4">
                    {[1, 2].map((i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${step >= i ? 'bg-[#156064]' : 'bg-gray-300'}`}
                      />
                    ))}
                  </div>

                  {step < 2 ? (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`ml-auto flex items-center bg-[#156064] text-white font-medium py-2 px-4 rounded hover:bg-[#0e4a4d] transition-colors`}
                    >
                      Next <FaArrowRight className="ml-2" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!isValid || isSubmitting || loading}
                      className={`ml-auto bg-[#156064] text-white font-medium py-2 px-6 rounded hover:bg-[#0e4a4d] transition-colors ${
                        !isValid || loading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {loading ? 'Submitting...' : 'Submit'}
                    </button>
                  )}
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default WelcomeWizard;