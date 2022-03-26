import React, { useMemo, useState } from 'react'
import { useTable, useSortBy, useGlobalFilter, useFilters,
         usePagination, useRowSelect, useColumnOrder } from 'react-table'
import MOCK_DATA from './Arjuna_MOCK_DATA.json'
import { COLUMNS } from './columns'
import Table from 'react-bootstrap/Table'
import SearchModal from 'src/components/table/SearchModal'
import StickyTable from 'src/components/table/StickyTable'

import{
  CPagination,
  CPaginationItem,
} from '@coreui/react'

export const LeadTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
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
    setColumnOrder,
    allColumns,
    getToggleHideAllColumnsProps
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
  );

  return (
    <>
      <SearchModal hg={headerGroups}/>
      <br />

      <StickyTable height={350}>
      <Table {...getTableProps()} striped bordered hover responsive="sm">
        <thead>
          {headerGroups.map( (headerGroup, idx1) => (
            <tr key={idx1} {...headerGroup.getHeaderGroupProps()} className='customRow header blue'>
              {headerGroup.headers.map( (column, idx2) => (
                <th key={idx2} {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? column.isSortedDesc ? '|' : '^' : ''}
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
                {row.cells.map( (cell, idx2) => {
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
        activePage={pageIndex + 1}
        pages={10}
        onActivePageChange={(i) => gotoPage(i)}>
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