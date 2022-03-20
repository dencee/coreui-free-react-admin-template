import React from 'react'
import { LeadTable } from 'src/components/table/LeadTable'

export default function Leads() {

  return (
    <>
      <h1 id="LeadOverview" className="card-title mb-4">
        All Leads
      </h1>
      <LeadTable />
    </>
  )
}
