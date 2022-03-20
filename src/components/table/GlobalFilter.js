import React, {useState} from 'react';
import {useAsyncDebounce} from 'react-table'
import PropTypes from 'prop-types';

const GlobalFilter = ({filter, setFilter}) => {
    const [filterState, setFilterState] = useState(filter)

    const onChange = useAsyncDebounce(value => {
        setFilter(value || undefined)
    }, 1000);

  return(
    <div>
    <span>
        <input placeholder='Search...' 
               value={filterState || ''}
               onChange={e => {
                    setFilterState(e.target.value);
                    onChange(e.target.value);
               }
            } />
    </span>
    </div>
  );
}

GlobalFilter.propTypes = {
  filter: PropTypes.node,
  setFilter: PropTypes.elementType
}

export default GlobalFilter
