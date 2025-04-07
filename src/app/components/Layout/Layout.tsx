'use client'
import React, { useEffect } from 'react';
import { Sidebar } from './SideBar/SIdeBar';
import TopBar from './navBar/NavBar';
import { AppDispatch, RootState } from '@/app/Redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { checkTokenConsistency, revalidateToken } from '@/app/Redux/auth/authSlice';
import AnimatedLoader from '../animation';
import { useDashboard } from '@/app/Context/DahboardContext';

export default function Layout({ children }: { children: React.ReactNode }) {

  const { isAuthenticated, loading, error } = useSelector((state: RootState) => state.auth);
  const router=useRouter()
  useEffect(()=>{
   if (!isAuthenticated){
    router.push('/')
   }
  })
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(revalidateToken()); 
    dispatch(checkTokenConsistency()); 
  }, [dispatch]);
  // const { isLoading, setIsLoading} = useDashboard();
  // const isLoading=true;
  return (
    <div className='w-full'>
      <div className='flex  flex-col w-full'>
        <div className=' flex flex-row'>
          <div className=' bg-[#24262D] md:max-w-64 min-h-screen '>
            <Sidebar />
          </div>
          
          <div className='flex flex-col   w-full'>
            <div className='sticky top-0 bg-white z-50'><TopBar /></div>
            <div className='px-[27px]  pt-[48px] bg-[#FAFAFA] h-full'>
              {children}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
