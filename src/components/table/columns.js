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
  return( <div style={{ textAlign: "center" }}>{headerText}</div> );
}

export const COLUMNS = [
      {
        Header: defaultHeader('Name'),
        Footer: 'Name',
        accessor: 'name',
        disableFilters: true
      } ,
      {
        Header: defaultHeader('Phone'),
        Footer: 'Phone',
        accessor: 'phone',
        disableSortBy: true,
        disableFilters: true
      }, 
      {
        Header: defaultHeader('Engagement'),
        Footer: 'Engagement',
        accessor: 'engagement',
        disableSortBy: true,
        disableFilters: true,
      },
      {
        Header: defaultHeader('E-mail'),
        Footer: 'E-mail',
        accessor: 'email',
        disableFilters: true
      },
      {
        Header: defaultHeader('Date'),
        Footer: 'Date',
        accessor: 'date',
        filter: multiSelectFilter
      },
      {
        Header: defaultHeader('Lead Status'),
        Footer: 'Lead Status',
        accessor: 'status',
        filter: multiSelectFilter
      },
      {
        Header: defaultHeader('Indication'),
        Footer: 'Indication',
        accessor: 'indication',
        filter: multiSelectFilter
      }
   ];
