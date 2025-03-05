import React from 'react';
import InputField from '../FormInputs/iputDetails';
import OptionInput from '../FormInputs/OptionInput';
import { CircleAlert } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FileUpload from '../FormInputs/Uploadinput';
import CustomizedButton from '../CustomizedButton';

// Yup validation schema
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
    .email('Invalid email format'),
  Company_Phone: Yup.string()
    .required('Company Phone is required')
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  Company_Logo: Yup.mixed()
    .required('Company Logo is required')
    .test('fileSize', 'File size must be less than 1 MB', (value) => {
      if (value) {
        const file = value as File; // Cast value to File
        return file.size <= 1 * 1024 * 1024; // Check file size
      }
      return true;
    })
    .test('fileType', 'Only PNG and JPG files are allowed', (value) => {
      if (value) {
        const file = value as File; // Cast value to File
        return ['image/png', 'image/jpeg'].includes(file.type); // Check file type
      }
      return true;
    }),
});

export default function Company_info() {
  // Formik initialization
  const formik = useFormik({
    initialValues: {
      company_Name: '',
      Company_Dashboard_URL: '',
      Company_Website: '',
      Company_Email: '',
      Company_Phone: '',
      Company_Logo: null, // Add Company_Logo to initialValues
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('Form submitted:', values);
      // Handle form submission here
    },
  });

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
            />
          </div>

          <div className="grid w-full grid-cols-2 gap-6">
            {/* Company Dashboard URL */}
            <div className="mb-[24px] w-full">
              <InputField
                label="Company Dashboard URL"
                placeholder="Enter Company Dashboard URL"
                value={formik.values.Company_Dashboard_URL}
                onChange={formik.handleChange('Company_Dashboard_URL')}
             
                error={formik.touched.Company_Dashboard_URL && formik.errors.Company_Dashboard_URL}
                required
              />
            </div>

            {/* Company Website */}
            <div className="mb-[24px] w-full">
              <InputField
                label="Company Website"
                placeholder="Enter Company Website"
                value={formik.values.Company_Website}
                onChange={formik.handleChange('Company_Website')}
              
                error={formik.touched.Company_Website && formik.errors.Company_Website}
                required
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
                onChange={formik.handleChange('Company_Email')}
               
                error={formik.touched.Company_Email && formik.errors.Company_Email}
                required
              />
            </div>

            {/* Company Phone */}
            <div className="mb-[24px] w-full">
              <InputField
                label="Company Phone"
                placeholder="Enter Company Phone"
                value={formik.values.Company_Phone}
                onChange={formik.handleChange('Company_Phone')}
                
                error={formik.touched.Company_Phone && formik.errors.Company_Phone}
                required
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
          <CustomizedButton text={'Save changes'} />
        </div>
      </form>
    </div>
  );
}