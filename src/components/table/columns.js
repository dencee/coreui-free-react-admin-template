import React from "react";

// -DMC Create multiple functions for optimization
function multiSelectFilter(rows, colIds, filterValue){
  //return filterValue === 0 ? rows : rows.filter( (row) => filterValue.includes(String(row.original.status)))
  if( filterValue.length === 0 ){
    return rows;
  } else {
    const result = rows.filter( (row) => {
      let rowOriginalStr = null;

      if( colIds[0] === 'indication' ){
        rowOriginalStr = String(row.original.indication);
      } else if( colIds[0] === 'status' ){
        rowOriginalStr = String(row.original.status);
      } else if( colIds[0] === 'date' ){
        rowOriginalStr = String(row.original.date);
      }

      return filterValue.includes(rowOriginalStr)
    });

    return result;
  }
}

const defaultHeader = (headerText) => {
  return( <span style={{ textAlign: "center" }}>{headerText}</span> );
}

export const COLUMNS = [
      {
        Header: defaultHeader('Name / Phone'),
        Footer: 'Name / Phone',
        accessor: 'name',
        width: "25%",
        disableFilters: true,
        Cell: row => {
          return(
            <>
              <div><strong>{row.row.original.name}</strong></div>
              <div>{row.row.original.phone}</div>
            </>
          )
        }
      },
      {
        Header: defaultHeader('Engagement'),
        Footer: 'Engagement',
        accessor: 'engagement',
        width: "5%",
        disableSortBy: true,
        disableFilters: true,
      },
      {
        Header: defaultHeader('E-mail'),
        Footer: 'E-mail',
        accessor: 'email',
        width: "25%",
        disableFilters: true
      },
      {
        Header: defaultHeader('Date'),
        Footer: 'Date',
        accessor: 'date',
        width: "10%",
        filter: multiSelectFilter
      },
      {
        Header: defaultHeader('Lead Status'),
        Footer: 'Lead Status',
        accessor: 'status',
        width: "15%",
        filter: multiSelectFilter
      },
      {
        Header: defaultHeader('Indication'),
        Footer: 'Indication',
        accessor: 'indication',
        width: "20%",
        filter: multiSelectFilter
      }
   ];
