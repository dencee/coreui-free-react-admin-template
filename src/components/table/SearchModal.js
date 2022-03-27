import React, { useState } from 'react'
import PropTypes from 'prop-types';
import {
  CFormCheck,
  CFormSwitch,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CCard,
  CCardBody,
  CCardTitle,
  CCol,
  CRow
} from '@coreui/react'

import { DateRange } from 'react-date-range';
import { BsSliders } from 'react-icons/bs';

const dateLabels = ['Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days', 'This Month', 'Last Month', 'Custom'];
const statusLabels = ['New', 'Contacting', 'Not Eligible', 'Duplicate', 'Fraudulent', 'Bad Info', 'Test Lead',
                      'In Prescreening', 'Qualified Screening', 'Prescreen Fail', 'Prescreen No Show', 'Scheduled Screening',
                      'Screen No Show', 'In Screening', 'Screen Fail', 'Randomized', 'No Contact'];
const clientLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const indicationLabels = ['Adjustment Disorder', 'Depression', 'Lumbosacral Radicular Pain', 'Migraine', 'N/A',
                          'Obsessive Compulsive Disorder', 'PTSD', 'Schizophrenia', 'Schizophrenia - Weight Gain',
                          'Social Anxiety Disorder'];

function getFormattedDate(dateObj){
  return (dateObj.getMonth() + 1) + '/' + dateObj.getDate() + '/' + dateObj.getFullYear();
}

const DateCustom = (props) => {
  return (
      <DateRange
        months={1}
        showSelectionPreview={false}
        showMonthAndYearPickers={false}
        showPreview={false}
        editableDateInputs={true}
        ranges={[props.selection]}
        onChange={ item => {
          props.setDateSelectionFunc(item)
        }}
      /> 
  )
};

const AppliedFilters = (props) => {
  let filtersArr = []
  
  props.columns.forEach( (column) => {
    if (column.filterValue && column.filterValue.length) {
      if( column.Footer === 'Date' && column.filterValue.length > 1 ){
        filtersArr.push(
          <CButton
            key={'multiDate'}
            color="light"
            size="sm"
            disabled>
              {column.filterValue[0] + ' - ' + column.filterValue[column.filterValue.length - 1]}
          </CButton>
        )
      } else {
        column.filterValue.forEach( (item, idx) => (
          filtersArr.push(
            <CButton
              key={item + idx}
              color="light"
              size="sm"
              disabled>
                {item}
            </CButton>
          )
        ))
      }
    }
  })

  return filtersArr;
};

function applyFilterChanges(columns, checkedDateState, checkedStatusState, checkedIndicationState, dateSelection){
  columns.forEach( (column) => {
    let filterArr = []

    if( column.Footer === 'Lead Status' ){
      for( let i = 0; i < checkedStatusState.length; i++ ){
        if( checkedStatusState[i] ){
          filterArr.push(statusLabels[i])
        }
      }
    } else if( column.Footer === 'Indication' ){
      for( let i = 0; i < checkedIndicationState.length; i++ ){
        if( checkedIndicationState[i] ){
          filterArr.push(indicationLabels[i])
        }
      }
    } else if ( column.Footer === 'Date' ){
      // -DMC finish later
      for( let i = 0; i < checkedDateState.length; i++ ){
        if( checkedDateState[i] ){
          let date = new Date();

          if( dateLabels[i].toLowerCase() === 'today' ){
            filterArr.push(getFormattedDate(date));
          } else if( dateLabels[i].toLowerCase() === 'yesterday' ){
            date.setDate(date.getDate() - 1);
            filterArr.push(getFormattedDate(date))
          } else if( dateLabels[i].toLowerCase() === 'last 7 days' ){
            filterArr.push(getFormattedDate(date))

            for( let i = 0; i < 6; i++){
              date.setDate(date.getDate() - 1);
              filterArr.push(getFormattedDate(date))
            }
          } else if( dateLabels[i].toLowerCase() === 'last 30 days' ){
            filterArr.push(getFormattedDate(date))

            for( let i = 0; i < 29; i++){
              date.setDate(date.getDate() - 1);
              filterArr.push(getFormattedDate(date))
            }
          } else if( dateLabels[i].toLowerCase() === 'this month' ){
            const currentDay = date.getDate();

            for( let i = 1; i <= currentDay; i++){
              date.setDate(i);
              filterArr.push(getFormattedDate(date))
            }
          } else if( dateLabels[i].toLowerCase() === 'last month' ){
            date.setDate(0);
            const lastMonth = date.getMonth();

            while( date.getMonth() === lastMonth ){
              filterArr.push(getFormattedDate(date))
              date.setDate(date.getDate() - 1);
            }
          } else if( dateLabels[i].toLowerCase() === 'custom' ){
            // Do not modify dateSelection Object.
            // It will change the previously selected dates when going back into the filters modal
            let currentDate = new Date(dateSelection.selection['startDate']);
            let endDate = new Date(dateSelection.selection['endDate']);

            if( currentDate != null ){
              while( currentDate <= endDate ){
                filterArr.push(getFormattedDate(currentDate))
                currentDate.setDate(currentDate.getDate() + 1)
              }
            }
          }

          // Only 1 date option is allowed
          break;
        }
      }
    }

    column.setFilter(filterArr);
  });
}

const SearchModal = (props) => {
  //const columns = props.hg[0].headers == null ? null : props.hg[0].headers;
  const columns = props.hg[0].headers;

  // Visibility of the filter modal
  const [visible, setVisible] = useState(false);

  // State of the date picker
  const [dateSelection, setDateSelection] = useState({
    selection: {
      startDate: null,
      endDate: new Date(),
      key: 'selection'
    }
  });

  const allSwitchStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const [statusAllState, setStatusAllState] = useState(true)    // -DMC don't know why setting initial to true works...
  const [clientAllState, setClientAllState] = useState(true)    // -DMC don't know why setting initial to true works...
  const [indicationAllState, setIndicationAllState] = useState(true)    // -DMC don't know why setting initial to true works...
  const [allStatus, setAllStatus] = useState(false)
  const [allClient, setAllClient] = useState(false)
  const [allIndication, setAllIndication] = useState(false)

  const [checkedDateState, setcheckedDateState] = useState(
    new Array(dateLabels.length).fill(false)
  );

  const [checkedStatusState, setCheckedStatusState] = useState(
    new Array(statusLabels.length).fill(false)
  );

  const [checkedClientState, setCheckedClientState] = useState(
    new Array(clientLabels.length).fill(false)
  );

  const [checkedIndicationState, setCheckedIndicationState] = useState(
    new Array(indicationLabels.length).fill(false)
  );

  const labelButtons = checkedDateState.map((val, idx) => {
      return(
        <CButton
          key={idx}
          active={val}
          className='m-1'
          color="primary"
          variant="outline"
          shape="rounded-pill"
          onClick={() => {
            let isSelected = checkedDateState[idx];

            let newArr = new Array(checkedDateState.length).fill(false)

            if(!isSelected) {
              newArr[idx] = true;
            }
            setcheckedDateState(newArr)
          }
        }>
          {dateLabels[idx]}
        </CButton>
      )
    }
  );

  const statusButtons = checkedStatusState.map((val, idx) => (
    <CFormCheck key={idx}
                id={'status' + idx}
                inline
                label={statusLabels[idx]}
                checked={val}
                onChange={(e) => {
                  let newArr = [...checkedStatusState]
                  newArr[idx] = !checkedStatusState[idx]
                  setCheckedStatusState(newArr)
                }}>
    </CFormCheck>
  ));

  const clientButtons = checkedClientState.map((val, idx) => (
    <CFormCheck key={idx}
                id={'client' + idx}
                inline
                label={clientLabels[idx]}
                checked={val}
                onChange={(e) => {
                  let newArr = [...checkedClientState]
                  newArr[idx] = !checkedClientState[idx]
                  setCheckedClientState(newArr);
                }}>
    </CFormCheck>
  ));

  const indicationButtons = checkedIndicationState.map((val, idx) => (
    <CFormCheck key={idx}
                id={'indication' + idx}
                inline
                label={indicationLabels[idx]}
                checked={val}
                onChange={(e) => {
                  let newArr = [...checkedIndicationState]
                  newArr[idx] = !checkedIndicationState[idx]
                  setCheckedIndicationState(newArr);
                }}>
    </CFormCheck>
  ));

  return (
    <>
      <CButton
        color="primary"
        variant="outline"
        size="lg"
        onClick={() => setVisible(!visible)}
      >
        <BsSliders />
        &nbsp;&nbsp;Filters...
      </CButton>

      <span>
      <AppliedFilters columns={columns}/>
      </span>

      <CModal size ='lg' visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>
            <BsSliders />&nbsp;Filters
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div>
          <CRow>
            <CCol>
            <CCard>
              <CCardTitle>Submitted</CCardTitle>
              <CCardBody>
                {labelButtons.map(b => b)}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {checkedDateState[checkedDateState.length - 1] ?
                  <DateCustom setDateSelectionFunc={setDateSelection}
                              selection={dateSelection.selection}/>
                  : null
                }
                </div>
              </CCardBody>
            </CCard>
            </CCol>
          </ CRow>
          </div>
          <CRow>
            <CCol>
            <CCard>
              <CCardTitle>
                <div style={allSwitchStyle}>
                Status&nbsp;&nbsp;&nbsp;&nbsp;
                <CFormSwitch id="allStatus"
                              label="All"
                              checked={allStatus}
                              onChange={(e) => {
                                setAllStatus(() => !allStatus)
                                setStatusAllState(() => !statusAllState)
                                setCheckedStatusState(() => new Array(checkedStatusState.length ).fill(statusAllState) )
                              }} />
                </div>
              </CCardTitle>
              <CCardBody>
                {statusButtons.map(b => b)}
              </CCardBody>
            </CCard>
            </CCol>
          </ CRow>

          <CRow>
            <CCol>
            <CCard>
              <CCardTitle>
                <div style={allSwitchStyle}>
                Clients&nbsp;&nbsp;&nbsp;&nbsp;
                <CFormSwitch id="allClient"
                              label="All"
                              checked={allClient}
                              onChange={(e) => {
                                setAllClient(() => !allClient)
                                setClientAllState(() => !clientAllState)
                                setCheckedClientState(() => new Array(checkedClientState.length).fill(clientAllState))
                              }} />
                </div>
              </CCardTitle>
              <CCardBody>
                {clientButtons.map(b => b)}
              </CCardBody>
            </CCard>
            </CCol>
          </ CRow>

          <CRow>
            <CCol>
            <CCard>
              <CCardTitle>
                <div style={allSwitchStyle}>
                Indications&nbsp;&nbsp;&nbsp;&nbsp;
                <CFormSwitch id="allIndication"
                              label="All"
                              checked={allIndication}
                              onChange={(e) => {
                                setAllIndication(() => !allIndication)
                                setIndicationAllState(() => !indicationAllState)
                                setCheckedIndicationState(() => new Array(checkedIndicationState.length).fill(indicationAllState))
                              }} />
                </div>
              </CCardTitle>
              <CCardBody>

                {indicationButtons.map(b => b)}
              </CCardBody>
            </CCard>
            </CCol>
          </ CRow>

        </CModalBody>
        <CModalFooter>
          <CButton color="secondary"
                  onClick={() => {
                    setAllStatus(() => false)
                    setAllClient(() => false)
                    setAllIndication(() => false)
                    
                    setStatusAllState(() => true)
                    setClientAllState(() => true)
                    setIndicationAllState(() => true)

                    setcheckedDateState(() => new Array(checkedDateState.length).fill(false))
                    setCheckedClientState(() => new Array(checkedClientState.length).fill(false))
                    setCheckedStatusState(() => new Array(checkedStatusState.length).fill(false))
                    setCheckedIndicationState(() => new Array(checkedIndicationState.length).fill(false))
                  }}>
            Reset
          </CButton>
          <CButton color="primary" onClick={() => {
            applyFilterChanges(columns, checkedDateState, checkedStatusState, checkedIndicationState, dateSelection);
            setVisible(false);
          }}>
            Apply
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

SearchModal.propTypes = {
  hg: PropTypes.array
}

DateCustom.propTypes = {
  setDateSelectionFunc: PropTypes.func,
  selection: PropTypes.array,
}

AppliedFilters.propTypes = {
  columns: PropTypes.array,
}

export default SearchModal
