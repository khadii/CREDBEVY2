"use client";

import { useEffect, useState, use } from "react"; 
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/Redux/store";
import toast from "react-hot-toast";
import AnimatedLoader from "@/app/components/animation";
import { verifyInvitation } from "@/app/Redux/invitation_thunk";
import { clearInvitationError } from "@/app/Redux/invitation_slice";

export default function AcceptInvitation({
  params,
}: {
  params: Promise<{ id: string }>; 
}) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, verified, invitationData } = useSelector(
    (state: RootState) => state.invitation
  );
  const logo = "/Image/cred.svg";

  const [displayError, setDisplayError] = useState<string | null>(null);

  // Unwrap the params Promise using React.use()
  const resolvedParams = use(params);
  const invitationId = resolvedParams.id; 

  useEffect(() => {
    // Use invitationId here instead of params.id
    if (invitationId) {
      dispatch(verifyInvitation(invitationId));
    }
  }, [dispatch, invitationId]); 

  useEffect(() => {
    if (error) {
      setDisplayError(error);
      toast.error(error);
      dispatch(clearInvitationError());
    }

    if (verified && invitationData) {
      toast.success(
        `Invitation verified! You've been invited to join ${invitationData.organization} as ${invitationData.role}. Please login to continue.`
      );
      router.push("/");
    }
  }, [error, verified, invitationData, router, dispatch]);

  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen">
      <div className="w-full flex justify-center pb-72">
        <div className="max-w-7xl w-full md:p-0 p-6">
          <div className="mb-24 pt-16 md:pl-28">
            <img src={logo} alt="Credbevy Logo" className="h-8 w-auto" />
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="mx-auto max-w-[600px] text-center">
              {displayError ? (
                <>
                  <h1 className="text-2xl font-bold text-red-600 mb-4">
                    Invitation Verification Failed
                  </h1>
                  <p className="text-red-500 mb-8">{displayError}</p>
                  <button
                    onClick={() => router.push("/")}
                    className="mt-4 font-semibold px-6 py-3 bg-[#156064] text-white rounded-md hover:bg-[#124b4f] transition-colors"
                  >
                    Go to Home
                  </button>
                </>
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-[#333333] mb-4">
                    {loading ? "Verifying Your Invitation" : "Invitation Verified"}
                  </h1>
                  <p className="text-[#8A8B9F] mb-8">
                    {loading
                      ? "Please wait while we verify your invitation..."
                      : "Redirecting you to login..."}
                  </p>
                  <div className="w-16 h-16 border-4 border-[#156064] border-t-transparent rounded-full animate-spin mx-auto"></div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <AnimatedLoader isLoading={loading} />
    </div>
  );
}