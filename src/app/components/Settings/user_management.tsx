import React, { useState } from 'react'
import Search from '../Search'
import User_managementTable from './User_ManagementTable';
import ErrorDisplay from '../ErrorDisplay';
import { useSelector } from 'react-redux';

export default function User_management() {
    const [showSeeAllLink, setShowSeeAllLink] = useState(false);
  const { data, loading, error, success } = useSelector(
    (state: any) => state.userManagement
  );
  return (

     <>
    {error ?  <ErrorDisplay error={error} title={error}/>  : (
        <div className='w-full min-h-screen pb-[200px]'> 
        <Search
     
    />
      <User_managementTable/>
    </div>
    )}
  </>

  )
}
