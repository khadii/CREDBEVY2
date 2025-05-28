"use client";
import React, { useEffect } from "react";
import { Sidebar } from "./SideBar/SIdeBar";
import TopBar from "./navBar/NavBar";
import { AppDispatch, RootState } from "@/app/Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  checkTokenConsistency,
  revalidateToken,
} from "@/app/Redux/auth/authSlice";
import AnimatedLoader from "../animation";
import { useDashboard } from "@/app/Context/DahboardContext";
import LogoutModal from "../Modals/LogoutModal";
import PrivacyPolicy from "../Modals/Privacy_policy";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading, error } = useSelector(
    (state: RootState) => state.auth
  );
  const {
    loading: userloading,
    error: usererror,
    data: userdata,
  } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(revalidateToken());
    dispatch(checkTokenConsistency());
  }, [dispatch]);
  // const { isLoading, setIsLoading} = useDashboard();
  // const isLoading=true;
  const { logout, setLogout, privacyPolicy, setPrivacyPolicy } = useDashboard();
  useEffect(() => {
    if (userdata && userdata?.policy_accepted) {
      setPrivacyPolicy(userdata?.policy_accepted);
    }
  }, [userdata, setPrivacyPolicy]);

  return (
    <div className="w-full">
      <div className="flex  flex-col w-full">
        <div className=" flex flex-row">
          <div className=" bg-[#24262D] md:max-w-64 min-h-screen ">
            <Sidebar />
          </div>

          <div className="flex flex-col   w-full">
            <div className="sticky top-0 bg-white z-50">
              <TopBar />
            </div>
            <div className="px-[27px]  pt-[48px] bg-[#FAFAFA] h-full">
              {children}
              {logout && <LogoutModal onClose={() => setLogout(false)} />}
              {privacyPolicy==='false'&& (
                <PrivacyPolicy
                  onClose={() => setPrivacyPolicy(userdata?.policy_accepted)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
