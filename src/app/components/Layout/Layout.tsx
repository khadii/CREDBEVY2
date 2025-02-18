import React from 'react';
import { Sidebar } from './SideBar/SIdeBar';
import TopBar from './navBar/NavBar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-full flex justify-center '>
      <div className='flex  flex-col w-full justify-center items-center'>
        <div className=' flex flex-row'>
          <div className=' bg-[#1C1C28] md:w-64 '>
            <Sidebar />
          </div>
          
          <div className='flex flex-col  w-6xl'>
            <div className='sticky top-0 bg-white z-50'><TopBar /></div>
            <div className='px-[27px]  mt-20 bg-[#FAFAFA]'>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
