import React from 'react';
import { Sidebar } from './SideBar/SIdeBar';
import TopBar from './navBar/NavBar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-full'>
      <div className='flex  flex-col w-full'>
        <div className=' flex flex-row'>
          <div className=' bg-[#24262D] md:max-w-64 '>
            <Sidebar />
          </div>
          
          <div className='flex flex-col   w-full'>
            <div className='sticky top-0 bg-white z-50'><TopBar /></div>
            <div className='px-[27px]  pt-[48px] bg-[#FAFAFA]'>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
