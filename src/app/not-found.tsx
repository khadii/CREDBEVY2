import Layout from "./components/Layout/Layout";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

export default function NotFoundPage() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-start h-full p-4 max-h-screen pb-[428px]">
        <Head>
          <title>404 - Page Not Found</title>
          <meta name="description" content="Page not found" />
        </Head>

        <div className="relative">
          {/* Main content */}
          <div className="text-center">
            <h1 className="text-[#156064] text-[180px]  tracking-wider  font-extrabold">
              4 0 4
            </h1>

            <h2 className="text-gray-800  text-[40px] font-bold">
              Page not found
            </h2>

            <p className="text-gray-600 mb-2">
              Oops! The page you are looking for does not exist or has been
              deleted
            </p>

            <Link href="/dashboard" className="w-full flex justify-center">
              <div className="bg-[#156064] hover:bg-teal-800 text-white font-medium h-[55px] w-[211px] rounded-[10px] transition-colors text-center flex justify-center items-center">
                Go back to Dashboard
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
