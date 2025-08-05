'use client';

import React, { useEffect } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { FaTimes } from 'react-icons/fa'; // Icon for the close button

// Import Redux hooks and the setPin thunk/selectors
import { useDispatch, useSelector } from 'react-redux';
import { setPin } from '../Redux/SETpIN/pin_thunk';
import { selectSetPinLoading, selectSetPinSuccess, selectSetPinError, selectSetPinMessage, resetSetPinState } from '../Redux/SETpIN/pinslice';
import { AppDispatch } from '../Redux/store';
import toast from 'react-hot-toast'; // For displaying notifications
import { fetchUserData } from '../Redux/auth/userdata';


interface SetPinModalProps {
  isOpen: boolean;
  onClose: () => void;
}


interface PinFormValues {
  pin: string;
  confirmPin: string;
}

// Validation schema for the PIN using Yup
const pinSchema = Yup.object().shape({
  pin: Yup.string()
    .required('PIN is required')
    .matches(/^\d{4}$/, 'PIN must be exactly 4 digits'), 
  confirmPin: Yup.string()
    .oneOf([Yup.ref('pin')], 'PINs must match') 
    .required('Confirm PIN is required'),
});


const SetPinModal: React.FC<SetPinModalProps> = ({ isOpen, onClose }) => {
  // Initialize Redux dispatch hook
  const dispatch = useDispatch<AppDispatch>();

  // Select relevant state from the Redux store using useSelector
  const loading = useSelector(selectSetPinLoading);
  const success = useSelector(selectSetPinSuccess);
  const error = useSelector(selectSetPinError);
  const message = useSelector(selectSetPinMessage);


  useEffect(() => {
    if (success) {
      // Display a success toast notification
      toast.success(message);
      onClose();
      dispatch(resetSetPinState()); 
            dispatch(fetchUserData());
    }
    if (error) {
      // Display an error toast notification
      toast.error(error);
      dispatch(resetSetPinState()); // Reset Redux state after an error
    }
  }, [success, error, message, onClose, dispatch]); // Dependencies for this effect

  useEffect(() => {
    if (isOpen) {
      dispatch(resetSetPinState());
    }
  }, [isOpen, dispatch]);
  if (!isOpen) return null;

  const handleSubmit = async (
    values: PinFormValues,
    { setSubmitting, resetForm }: FormikHelpers<PinFormValues>
  ) => {
    // Dispatch the setPin async thunk with the PIN data
    const resultAction = await dispatch(setPin({ pin: values.pin, confirm_pin: values.confirmPin }));

    // After dispatch, setSubmitting to false to re-enable the form fields and button
    setSubmitting(false);

    // Check if the thunk was fulfilled (successful API call)
    if (setPin.fulfilled.match(resultAction)) {


      if (!resultAction.payload.error) {
        resetForm();
              dispatch(resetSetPinState());
      }
    }
  };

  return (
  
    <div className="fixed inset-0 bg-[#17191CBA] bg-opacity-50 flex items-center justify-center p-4 z-50">
      {/* Modal content container */}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative p-6">
     
   

        {/* Formik wrapper for form state management and validation */}
        <Formik
          initialValues={{
            pin: '',
            confirmPin: '',
          }}
          validationSchema={pinSchema}
          onSubmit={handleSubmit}
          validateOnChange={true} 
          validateOnBlur={true} 
        >
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting, isValid }) => (
            <Form>
              <h2 className="text-2xl font-bold text-[#156064] mb-6 text-center">Set Your Transactions PIN</h2>
              <p className="text-gray-600 text-sm mb-4 text-center">
                Create a 4-digit PIN for transactions
              </p>
              <div className="space-y-4">
                {/* PIN input field */}
                <div className="w-full">
                  <label htmlFor="pin" className="block text-gray-800 font-semibold text-sm mb-1">
                    PIN <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="pin" 
                    name="pin"
                    type="password"
                    maxLength={4}
                    inputMode="numeric" 
                    pattern="\d*" 
                    value={values.pin}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full relative border rounded-md bg-[#FAFAFA] h-10 border-[#DCDCE4] flex items-center px-3 outline-none focus:outline-none text-sm focus:ring-2 focus:ring-[#156064] focus:border-transparent ${
                      errors.pin && touched.pin ? 'border-red-500' : ''
                    }`}
                    placeholder="Enter 4-digit PIN"
                    aria-invalid={errors.pin && touched.pin ? "true" : "false"} // Accessibility
                    aria-describedby="pin-error" // Accessibility
                  />
                  {touched.pin && errors.pin && (
                    <div id="pin-error" className="text-red-500 text-xs mt-1">{errors.pin}</div>
                  )}
                </div>
                {/* Confirm PIN input field */}
                <div className="w-full">
                  <label htmlFor="confirmPin" className="block text-gray-800 font-semibold text-sm mb-1">
                    Confirm PIN <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="confirmPin"
                    name="confirmPin"
                    type="password"
                    maxLength={4}
                    inputMode="numeric"
                    pattern="\d*"
                    value={values.confirmPin}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full relative border rounded-md bg-[#FAFAFA] h-10 border-[#DCDCE4] flex items-center px-3 outline-none focus:outline-none text-sm focus:ring-2 focus:ring-[#156064] focus:border-transparent ${
                      errors.confirmPin && touched.confirmPin ? 'border-red-500' : ''
                    }`}
                    placeholder="Confirm 4-digit PIN"
                    aria-invalid={errors.confirmPin && touched.confirmPin ? "true" : "false"} 
                    aria-describedby="confirmPin-error"
                  />
                  {touched.confirmPin && errors.confirmPin && (
                    <div id="confirmPin-error" className="text-red-500 text-xs mt-1">{errors.confirmPin}</div>
                  )}
                </div>
              </div>

              {/* Submit button */}
              <div className="mt-6 text-center">
                <button
                  type="submit"
               
                  disabled={!isValid || loading || isSubmitting}
                  className={`bg-[#156064] text-white font-medium py-[10px] px-6 w-full rounded-lg hover:bg-[#0e4a4d] transition-colors ${
                    !isValid || loading || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loading || isSubmitting ? 'Setting PIN...' : 'Set transaction PIN'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SetPinModal;
