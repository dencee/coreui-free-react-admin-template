import React from 'react';
import PropTypes from 'prop-types';

const ColumnFilter = ({ column }) => {
  const { Header, filterValue, setFilter } = column;

  return (
    <span>
      <input value={filterValue || ''}
             onChange={
               //(e) => setFilter(e.target.value)
               (e) => {
                if( Header === 'Indication' ){
                  setFilter(['PTSD'])
                  //setFilter(e.target.value)
                } else {
                  setFilter(e.target.value)
                }
               }
              }
      />
    </span>
  );
}

ColumnFilter.propTypes = {
  column: PropTypes.instanceOf(Object)
}

export default ColumnFilter
