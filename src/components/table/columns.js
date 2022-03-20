import ColumnFilter from './ColumnFilter'

// -DMC Create multiple functions for optimization
function multiSelectFilter(rows, colIds, filterValue){
  //return filterValue === 0 ? rows : rows.filter( (row) => filterValue.includes(String(row.original.status)))
  if( filterValue == 0 ){
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

export const COLUMNS = [
      {
        Header: 'Name',
        Footer: 'Name',
        accessor: 'name',
        disableFilters: true
      } ,
      {
        Header: 'Phone',
        Footer: 'Phone',
        accessor: 'phone',
        disableSortBy: true,
        disableFilters: true
      }, 
      {
        Header: 'Engagement',
        Footer: 'Engagement',
        accessor: 'engagement',
        disableSortBy: true,
      },
      {
        Header: 'E-mail',
        Footer: 'E-mail',
        accessor: 'email',
        disableFilters: true
      },
      {
        Header: 'Date',
        Footer: 'Date',
        accessor: 'date',
        Filter: ColumnFilter,
        filter: multiSelectFilter
      },
      {
        Header: 'Lead Status',
        Footer: 'Lead Status',
        accessor: 'status',
        Filter: ColumnFilter,
        filter: multiSelectFilter
      },
      {
        Header: 'Indication',
        Footer: 'Indication',
        accessor: 'indication',
        Filter: ColumnFilter,
        filter: multiSelectFilter
      }
   ];
