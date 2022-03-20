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

import { BsSliders } from 'react-icons/bs';

const dateLabels = ['Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days', 'This Month', 'Last Month', 'Custom'];
const statusLabels = ['New', 'Contacting', 'Not Eligible', 'Duplicate', 'Fraudulent', 'Bad Info', 'Test Lead',
                      'In Prescreening', 'Qualified Screening', 'Prescreen Fail', 'Prescreen No Show', 'Scheduled Screening',
                      'Screen No Show', 'In Screening', 'Screen Fail', 'Randomized', 'No Contact'];
const clientLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const indicationLabels = ['Adjustment Disorder', 'Depression', 'Lumbosacral Radicular Pain', 'Migraine', 'N/A',
                          'Obsessive Compulsive Disorder', 'PTSD', 'Schizophrenia', 'Schizophrenia - Weight Gain',
                          'Social Anxiety Disorder'];

function applyFilterChanges(columns, checkedDateState, checkedStatusState, checkedIndicationState){
  columns.forEach( (column) => {
    let filterArr = []

    if( column.Header === 'Lead Status' ){
      for( let i = 0; i < checkedStatusState.length; i++ ){
        if( checkedStatusState[i] ){
          filterArr.push(statusLabels[i])
        }
      }
    } else if( column.Header === 'Indication' ){
      for( let i = 0; i < checkedIndicationState.length; i++ ){
        if( checkedIndicationState[i] ){
          filterArr.push(indicationLabels[i])
        }
      }
    } else if ( column.Header === 'Date' ){
      // -DMC finish later
      checkedDateState.forEach(e => console.log(e))
    }

    column.setFilter(filterArr);
  });
}

const SearchModal = (props) => {
  console.log(props.hg[0].headers.forEach(e => console.log(e.Header)))
  const columns = props.hg[0].headers;

  //const [filterState, setFilterState] = useState(filter)
  const [visible, setVisible] = useState(false);

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

  const labelButtons = checkedDateState.map((val, idx) => (
/*
    <CFormCheck button={{ color: 'secondary', shape: 'rounded-pill' }}
                type="radio"
                name="options"
                key={idx}
                id={'label' + idx}
                label={dateLabels[idx]}>
    </CFormCheck>
*/
    <CButton key={idx}
            active={val}
            disabled={idx === checkedDateState.length-1 ? true : false}
            className='m-1'
            color="primary"
            variant="outline"
            shape="rounded-pill"
            onClick={() => {
              let newArr = new Array(checkedDateState.length).fill(false)
              newArr[idx] = true
              setcheckedDateState(newArr)
            }}>
            {dateLabels[idx]}
    </CButton>
  ));

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
      <CButton color="primary"
               variant="outline"
               size="lg"
               onClick={() => setVisible(!visible)}>
      <BsSliders />
        &nbsp;&nbsp;More Filters...
      </CButton>

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
            applyFilterChanges(columns, checkedDateState, checkedStatusState, checkedIndicationState);
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
  hg: PropTypes.node
  //filter: PropTypes.node,
  //setFilter: PropTypes.elementType
}

export default SearchModal
