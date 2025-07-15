import React from 'react'
import Search from '../Search'
import LogsTable from './logsTable'
import ErrorDisplay from '../ErrorDisplay'
import { useSelector } from 'react-redux';

export default function Logs() {
    const {
    data: logsData,
    pagination,
    loading,
    error,
  } = useSelector((state: any) => state.auditLogs);
  return (
         <>
        {error ?  <ErrorDisplay error={error} title={error}/>  : (
    <div className='mb-[40px]'>
      <Search  showSeeAll={false} searchName={'Search Logs'}/>
      <LogsTable/>

    </div>
     )}
  </>
  )
}
