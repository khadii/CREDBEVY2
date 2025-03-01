
"use client";

import { Form, Formik } from "formik";
import { Eye } from "lucide-react";
import * as Yup from "yup";
import { FormField, PasswordFormField } from "./Formcomponents/InputField";
import { useRouter } from "next/navigation";
// import logo from '../../../../public/Image/cred.svg';
export default function LoginPage() {
  const router =useRouter()
  const logo = "/Image/cred.svg";
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is Required"),
    password: Yup.string()
      .min(8, "Must be at least 8 characters")
      .required("password is Required"),
  });

  const onSubmit = (values: typeof initialValues) => {
    console.log(values);
    router.push('/dashboard')
  };
  return (
    <>
      {/* Logo */}

      <div className=" w-full bg-[#FAFAFA] h-screen  ">
        <div className="w-full flex justify-center pb-72">
          <div className="max-w-7xl w-full  md:p-0 p-6">
            <div className="mb-24 pt-16 md:pl-28 ">
              <img src={logo} alt="Credbevy Logo" className="h-8 w-auto" />
            </div>
            <div className="">
              {/* Login Form */}
              <div className="mx-auto max-w-[400px] max-h-[362px]">
                <h1 className="mb-14 text-center text-2xl font-bold text-[#333333]">
                  Login
                </h1>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  <Form className="">
                    <div className="">
                      <div className="mb-6">
                      <FormField type="text" name="email" placeholder="Email" />
                      </div>

                      <div className="relative">
                      <PasswordFormField type="password" name="password" placeholder="Password" />
                      </div>
                    </div>
                    <div className="w-full mt-10">
                      <button
                        type="submit"
                        className="mt-6 w-full rounded-[4px] bg-[#0F5959] h-[58px] text-center text-base font-bold text-white hover:bg-[#0F5959]/90 "
                      >
                        Login
                      </button>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
