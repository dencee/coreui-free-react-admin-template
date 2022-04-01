import React, { useMemo } from 'react'
import {
  useTable, useSortBy, useGlobalFilter, useFilters,
  usePagination, useRowSelect, useColumnOrder
} from 'react-table'
import MOCK_DATA from './Arjuna_MOCK_DATA.json'
import { COLUMNS } from './columns'
import Table from 'react-bootstrap/Table'
import FilterModal from 'src/components/table/FilterModal'
import StickyTable from 'src/components/table/StickyTable'
import Checkbox from 'src/components/table/Checkbox'
import RowEditModal from 'src/components/table/RowEditModal'

import {
  CPagination,
  CPaginationItem,
} from '@coreui/react'

import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa';

const dateLabels = ['Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days', 'This Month', 'Last Month', 'Custom'];
const statusLabels = ['New', 'Contacting', 'Not Eligible', 'Duplicate', 'Fraudulent', 'Bad Info', 'Test Lead',
                      'In Prescreening', 'Qualified Screening', 'Prescreen Fail', 'Prescreen No Show', 'Scheduled Screening',
                      'Screen No Show', 'In Screening', 'Screen Fail', 'Randomized', 'No Contact'];
const clientLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const indicationLabels = ['Adjustment Disorder', 'Depression', 'Lumbosacral Radicular Pain', 'Migraine', 'N/A',
                          'Obsessive Compulsive Disorder', 'PTSD', 'Schizophrenia', 'Schizophrenia - Weight Gain',
                          'Social Anxiety Disorder'];

const labels = {
  'dates': dateLabels,
  'statuses': statusLabels,
  'clients': clientLabels,
  'indications': indicationLabels,
}

export const LeadTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
    selectedFlatRows,
  } = useTable({
    columns,
    data,
    initialState: { pageSize: 25 },
  },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useColumnOrder,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: 'selection',
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }) => (
              <Checkbox {...row.getToggleRowSelectedProps()} />
            )
          },
          ...columns
        ]
      })
    }
  );

  return (
    <>
      <RowEditModal selected={selectedFlatRows} labels={labels} />
      <span><FilterModal headerGroups={headerGroups} labels={labels} /></span>
      <br />

      <StickyTable height={350}>
        <Table {...getTableProps()} striped bordered hover responsive="sm">
          <thead>
            {headerGroups.map((headerGroup, idx1) => (
              <tr key={idx1} {...headerGroup.getHeaderGroupProps()} className='customRow header blue'>
                {headerGroup.headers.map((column, idx2) => (
                  <th key={idx2} width={column.width} {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span style={{ float: 'right' }}>
                      {column.canSort ? column.isSorted ? column.isSortedDesc ? <FaSortDown /> : <FaSortUp /> : <FaSort /> : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, idx1) => {
              prepareRow(row)
              return (
                <tr key={idx1} {...row.getRowProps()} className='customRow'>
                  {row.cells.map((cell, idx2) => {
                    return <td key={idx2} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </Table>
      </StickyTable>

      <div className="pagination">

        <CPagination
          
          pages={10}
        >
          <CPaginationItem
            aria-label="First"
            disabled={!canPreviousPage}
            onClick={() => gotoPage(0)}
          ><span aria-hidden="true">&laquo;</span></CPaginationItem>
          <CPaginationItem
            aria-label="Previous"
            disabled={!canPreviousPage}
            onClick={() => previousPage()}
          ><span aria-hidden="true">&lt;</span></CPaginationItem>
          <CPaginationItem
            aria-label="Last"
            disabled={!canNextPage}
            onClick={() => nextPage()}
          ><span aria-hidden="true">&gt;</span></CPaginationItem>
          <CPaginationItem
            aria-label="Last"
            disabled={!canNextPage}
            onClick={() => gotoPage(pageCount - 1)}
          ><span aria-hidden="true">&raquo;</span></CPaginationItem>
        </CPagination>

        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>

        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            min={1}
            max={pageCount}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '50px' }}
          />
        </span>{' '}
        <span>
          <select
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value))
            }}
          >
            {[10, 25, 50].map(pageSize => (
              <option key={pageSize}
                value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </span>
      </div>
    </>
  )
}