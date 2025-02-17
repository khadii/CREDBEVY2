import React from 'react';
import { Sidebar } from './SideBar/SIdeBar';
import TopBar from './navBar/NavBar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-full '>
      <div className='flex  flex-col w-full justify-center'>
        <div className=' flex flex-row'>
          <div className='basis-1/5 bg-[#1C1C28] '>
            <Sidebar />
          </div>
          
          <div className='basis-4/5 flex flex-col '>
            <div className='sticky top-0 bg-white z-50'><TopBar /></div>
            <div className='px-7  mt-20 '>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
