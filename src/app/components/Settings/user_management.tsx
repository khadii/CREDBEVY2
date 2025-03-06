import React, { useState } from 'react'
import Search from '../Search'
import User_managementTable from './User_ManagementTable';

export default function User_management() {
    const [showSeeAllLink, setShowSeeAllLink] = useState(false);
  return (
    <div className='w-full min-h-screen pb-[200px]'> 
        <Search
         showSeeAll={showSeeAllLink} 
      onSearchClick={() => console.log("Search clicked")}
      onFilterClick={() => console.log("Filter clicked")}
      onSeeAllClick={() => console.log("See All clicked")}
    />
      <User_managementTable/>
    </div>
  )
}
