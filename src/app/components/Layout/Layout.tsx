import React from 'react';
import { Sidebar } from './SideBar/SIdeBar';
import TopBar from './navBar/NavBar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-full'>
      <div className='flex flex-col w-full justify-center'>
        <div className=' flex flex-row'>
          <div className='w-[20%]'>
            <Sidebar />
          </div>
          
          <div className='w-[80%] flex flex-col'>
            <TopBar />
            <div className='px-7'>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
