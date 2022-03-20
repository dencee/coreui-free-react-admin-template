import React, { useMemo, useState } from 'react'
import { useTable, useSortBy, useGlobalFilter, useFilters,
         usePagination, useRowSelect, useColumnOrder } from 'react-table'
import MOCK_DATA from './Arjuna_MOCK_DATA.json'
import { COLUMNS } from './columns'
import ColumnFilter from './ColumnFilter'
import Table from 'react-bootstrap/Table'
import SearchModal from 'src/components/table/SearchModal'

import {
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableBody,
  CTableDataCell
} from '@coreui/react'

export const LeadTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const defaultColumn = useMemo(() => {return {Filter : ColumnFilter}}, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    setGlobalFilter,
    setFilter,
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
      defaultColumn,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useColumnOrder,
    useRowSelect,
  );

  const { globalFilter, filters } = state;
  const [isOpen, setisOpen] = useState(false);

  function changeColOrder() {
    setColumnOrder([
      'id',
      'last_name',
      'first_name',
      'birthday',
      'e-mail',
      'phone'
    ]);
  }

  //<GlobalFilter filter={globalFilter}
  //setFilter={setGlobalFilter} />

  return (
    <>
      <SearchModal hg={headerGroups}/>
      <br /><br />

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

      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
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
      </div>
    </>
  )
}