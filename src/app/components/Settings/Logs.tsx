import React from 'react'
import Search from '../Search'
import LogsTable from './logsTable'

export default function Logs() {
  return (
    <div className='mb-[40px]'>
      <Search  showSeeAll={false}/>
      <LogsTable/>

    </div>
  )
}
