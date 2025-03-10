"use client";

import { Form, Formik } from "formik";
import * as Yup from "yup";
import { FormField, PasswordFormField } from "./Formcomponents/InputField";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/app/Redux/auth/authThunks";
import { AppDispatch } from "@/app/Redux/store";
import toast from "react-hot-toast";


export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: any) => state.auth);
  const router = useRouter();
  const logo = "/Image/cred.svg";
``
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(8, "Must be at least 8 characters").required("Password is required"),
  });

  const onSubmit = async (values: typeof initialValues) => {
    console.log(values);
    const loginAction = await dispatch(loginUser(values));

    if (loginUser.fulfilled.match(loginAction)) {
      toast.success("Login successful! Redirecting...");
      router.push("/dashboard");
    } else {
      toast.error(error || "Invalid email or password.");
    }
  };

  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen">
    <div className="w-full flex justify-center pb-72">
      <div className="max-w-7xl w-full md:p-0 p-6">
        <div className="mb-24 pt-16 md:pl-28">
          <img src={logo} alt="Credbevy Logo" className="h-8 w-auto" />
        </div>
        <div className="">
          <div className="mx-auto max-w-[400px] max-h-[362px]">
            <h1 className="mb-14 text-center text-2xl font-bold text-[#333333]">
              Login
            </h1>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-6">
                    <FormField type="text" name="email" placeholder="Email" />
                  </div>
                  <div className="relative">
                    <PasswordFormField type="password" name="password" placeholder="Password" />
                  </div>

                  <div className="w-full mt-10">
                    <button
                      type="submit"
                      className="mt-6 w-full rounded-[4px] bg-[#0F5959] h-[58px] text-center text-base font-bold text-white hover:bg-[#0F5959]/90 disabled:bg-gray-400"
                      disabled={loading || isSubmitting}
                    >
                      {loading || isSubmitting ? "Logging in..." : "Login"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
