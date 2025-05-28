'use client'

import React, { useEffect } from 'react';
import InputField from '../FormInputs/iputDetails';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FileUpload from '../FormInputs/Uploadinput';
import CustomizedButton from '../CustomizedButton';
import { useDispatch, useSelector } from 'react-redux';
import { CompanyInfoForm, fetchCompanyInfo } from '@/app/Redux/company_info/company_info_thunk';
import { resetSuccess } from '@/app/Redux/company_info/company_info_form_slice';
import toast from 'react-hot-toast';
import { AppDispatch, RootState } from '@/app/Redux/store';
import AnimatedLoader from '../animation';
import { useRouter } from 'next/navigation';


// Yup validation schema (for form submission)
const validationSchema = Yup.object({
  company_Name: Yup.string()
    .required('Company Name is required')
    .min(3, 'Company Name must be at least 3 characters'),
  Company_Dashboard_URL: Yup.string()
    .required('Company Dashboard URL is required')
    .url('Invalid URL format'),
  Company_Website: Yup.string()
    .required('Company Website is required')
    .url('Invalid URL format'),
  Company_Email: Yup.string()
    .required('Company Email is required')
    .email('Invalid email format')
    .test('is-company-email', 'Personal email is not allowed', (value) => {
      const personalEmailDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
      const domain = value.split('@')[1];
      return !personalEmailDomains.includes(domain);
    }),
  Company_Phone: Yup.string()
    .required('Company Phone is required')
    .matches(/^[0-9]{11}$/, 'Phone number must be 11 digits'),
  Company_Logo: Yup.mixed()
    .required('Company Logo is required')
    .test('fileSize', 'File size must be less than 1 MB', (value) => {
      if (value) {
        const file = value as File;
        return file.size <= 1 * 1024 * 1024;
      }
      return true;
    })
    .test('fileType', 'Only PNG and JPG files are allowed', (value) => {
      if (value) {
        const file = value as File;
        return ['image/png', 'image/jpeg'].includes(file.type);
      }
      return true;
    }),
});

export default function CompanyInfo() {
  const dispatch = useDispatch<AppDispatch>();
const {loading}= useSelector((state: any) => state.CompanyInfoForm);
  useEffect(() => {
    dispatch(fetchCompanyInfo());
  }, [dispatch]);
 const { loading:comploading, error:comperror, data:compandata } = useSelector(
    (state: RootState) => state.companyInfo
  );
    const router = useRouter()
    useEffect(() => {
    if (comperror==='Unauthorized') {
      router.push("/")
    }
  }, [comperror, router])
  const companyData = compandata as {
    company_name?: string;
    company_logo?: File;
    partner_contact_email?: string;
    company_dashboard_url: string;
    company_website: string;
    partner_contact_phone_number: string;
    partner_support_email: string;
    partner_notification_email: string;
  } | null;
  // Formik initialization



    useEffect(() => {
      if (companyData) {
        formik.setValues({
          company_Name: companyData?.company_name || "",
          Company_Dashboard_URL: companyData?.company_dashboard_url || "",
          Company_Website: companyData?.company_website || "",
          Company_Email: companyData?.partner_contact_email || "",
          Company_Phone: companyData?.partner_contact_phone_number || "",
          Company_Logo: null,
        });
      }
    }, [companyData]);
  const formik = useFormik({
    initialValues: {
      company_Name:companyData?.company_name || '',
      Company_Dashboard_URL: companyData?.company_dashboard_url ||"",
      Company_Website:companyData?.company_website || '',
      Company_Email:companyData?.partner_contact_email || '',
      Company_Phone: companyData?.partner_contact_phone_number ||'',
      Company_Logo: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        // Prepare form data for API
        const formData = new FormData();
        formData.append('partner_name', values.company_Name);
        formData.append('partner_website', values.Company_Website);
        formData.append('partner_contact_phone_number', values.Company_Phone);
        formData.append('partner_contact_email', values.Company_Email);
        if (values.Company_Logo) {
          formData.append('partner_logo', values.Company_Logo);
        }

        // Dispatch the Redux action
        
        const result =await dispatch(CompanyInfoForm(formData) as any);

        if (result.meta.requestStatus === 'fulfilled') {
          const response = result.payload as {
            error?: boolean;
            message?: string;
            data?: any;
          }}

          if (result.error) {
            toast.error(result.message || "Form submission failed");
          } else {
            toast.success(result.message || "Form submission  successfully");
          }
          dispatch(fetchCompanyInfo());
        
        // Reset form on successful submission
        resetForm();
        
        // // Reset success message after 3 seconds
        // setTimeout(() => {
        //   dispatch(resetSuccess());
        // }, 3000);
      } catch (error) {
        console.error('Submission error:', error);
      }
    },
  });

  // Handle Company Email Change
  const handleCompanyEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    formik.setFieldValue('Company_Email', value); // Ensure the value is set
  
    if (value.includes('@')) {
      const domain = value.split('@')[1];
      const personalEmailDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
      if (personalEmailDomains.includes(domain)) {
        formik.setFieldError('Company_Email', 'Personal email is not allowed');
      } else {
        formik.setFieldError('Company_Email', '');
      }
    }
  };
  

  // Handle Company Phone Change
  const handleCompanyPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length > 11) {
      value = value.slice(0, 11);
    }
    if (value !== e.target.value) {
      e.preventDefault();
      e.target.value = value;
    }
    formik.setFieldValue('Company_Phone', value);

    if (value && value.length !== 11) {
      formik.setFieldError('Company_Phone', 'Phone number must be 11 digits');
    } else {
      formik.setFieldError('Company_Phone', '');
    }
  };

  // Handle URL Change
  const handleURLChange = (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    formik.setFieldValue(fieldName, value);

    if (value) {
      try {
        new URL(value);
        formik.setFieldError(fieldName, '');
      } catch (error) {
        formik.setFieldError(fieldName, 'Invalid URL format');
      }
    } else {
      formik.setFieldError(fieldName, '');
    }
  };

  const handleCompanyDashboardURLChange = handleURLChange('Company_Dashboard_URL');
  const handleCompanyWebsiteChange = handleURLChange('Company_Website');

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="space-y-[24px] pb-[76px]">
        <div className="w-full max-w-[822px] h-full min-h-[528px] px-[24px] pt-[24px]  pb-[60px] bg-white border-[#E5EAEF] rounded-lg border">
          <p className="text-[#333333] text-[20px] font-bold mb-[24px]">Company Info</p>

          {/* Company Name */}
          <div className="mb-[24px] w-full">
            <InputField
              label="Company Name"
              placeholder="Enter Company Name"
              value={formik.values.company_Name}
              onChange={formik.handleChange('company_Name')}
              error={formik.touched.company_Name && formik.errors.company_Name}
              required
              disabled
            />
          </div>

          <div className="grid w-full grid-cols-2 gap-6">
            {/* Company Dashboard URL */}
            <div className="mb-[24px] w-full">
              <InputField
                label="Company Dashboard URL"
                placeholder="Enter Company Dashboard URL"
                value={formik.values.Company_Dashboard_URL}
                onChange={handleCompanyDashboardURLChange}
                error={formik.touched.Company_Dashboard_URL && formik.errors.Company_Dashboard_URL}
                required
                disabled
              />
            </div>

            {/* Company Website */}
            <div className="mb-[24px] w-full">
              <InputField
                label="Company Website"
                placeholder="Enter Company Website"
                value={formik.values.Company_Website}
                onChange={handleCompanyWebsiteChange}
                error={formik.touched.Company_Website && formik.errors.Company_Website}
                required
                disabled
              />
            </div>
          </div>

          <div className="grid w-full grid-cols-2 gap-6">
            {/* Company Email */}
            <div className="mb-[24px] w-full">
              <InputField
                label="Company Email"
                placeholder="Enter Company Email"
                value={formik.values.Company_Email}
                onChange={handleCompanyEmailChange}
                error={formik.touched.Company_Email && formik.errors.Company_Email}
                required
                disabled
              />
            </div>

            {/* Company Phone */}
            <div className="mb-[24px] w-full">
              <InputField
                label="Company Phone"
                placeholder="Enter Company Phone"
                value={formik.values.Company_Phone}
                onChange={handleCompanyPhoneChange}
                error={formik.touched.Company_Phone && formik.errors.Company_Phone}
                required
                disabled
              />
            </div>
          </div>

          {/* File Upload */}
          <div className="mb-[24px] w-full">
            <label className="block text-gray-800 font-semibold text-[12px] mb-1">
              Company Logo <span className="text-red-500">*</span>
            </label>
            <FileUpload
              onChange={(file) => formik.setFieldValue('Company_Logo', file)}
              onBlur={() => formik.setFieldTouched('Company_Logo', true)}
              value={formik.values.Company_Logo}
              error={formik.touched.Company_Logo && formik.errors.Company_Logo}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="w-full max-w-[822px] pt-[24px] flex justify-end">
          <CustomizedButton 
            text={loading?"processing....":'Save changes'} 
          />
        </div>
      </form>

      <AnimatedLoader isLoading={comploading}/>
    </div>
  );
}