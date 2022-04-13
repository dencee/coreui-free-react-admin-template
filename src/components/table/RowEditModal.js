import React, { useEffect, useState, useMemo } from 'react'
import PropTypes from 'prop-types';
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CFormInput,
  CFormLabel,
  CCol,
  CRow,
  CContainer,
  CFormSelect,
  CFormTextarea,
} from '@coreui/react'

import Labels from 'src/components/table/LABELS.json'
import { BsSliders } from 'react-icons/bs';

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function formatEntryName(propertyStr) {
  return propertyStr.charAt(0).toUpperCase() + propertyStr.slice(1, propertyStr.length);
}

function applyChanges(tableData, selected, setData){

  selected.forEach(row => {
    for( let i = 0; i < tableData.length; i++ ){

      /*
       * DMC Assumes only 1 unique name in table
       */
      if( tableData[i].name === row.values.name ){
        tableData[i] = row.values;
        break;
      }
    }
  });

  setData([...tableData]);

  console.log('applied')
}

const FormatEntrySet = (props) => {
  const data = props.data;
  const property = props.property;
  const labels = useMemo(() => Labels, []);

  const engagementLabels = labels.engagementLabels.map((val, idx) => (
    <option key={idx} value={idx}>{val}</option>
  ));

  const statusLabels = labels.statusLabels.map((val, idx) => (
    <option key={idx} value={idx}>{val}</option>
  ));

  const indicationLabels = labels.indicationLabels.map((val, idx) => (
    <option key={idx} value={idx}>{val}</option>
  ));

  if (property.toLowerCase() === 'engagement') {
    return (
      <CFormSelect
        onChange={event => data[property] = labels.engagementLabels[parseInt(event.target.value)]}
      >
        <option>{data[property]}</option>
        {engagementLabels}
      </CFormSelect>
    )
  } else if (property.toLowerCase() === 'status') {
    return (
      <CFormSelect
        onChange={event => data[property] = labels.statusLabels[parseInt(event.target.value)]}
      >
        <option>{data[property]}</option>
        {statusLabels}
      </CFormSelect>
    )
  } else if (property.toLowerCase() === 'indication') {
    return (
      <CFormSelect
        onChange={event => data[property] = labels.indicationLabels[parseInt(event.target.value)]}
      >
        <option>{data[property]}</option>
        {indicationLabels}
      </CFormSelect>
    )
  } else if (property.toLowerCase() === 'dates') {
    return (
      <CFormInput
        type="text"
        defaultValue={data[property]}
        onChange={event => data[property] = event.target.value}
      />
    ) 
  } else {
    return (
      <CFormInput
        type="text"
        defaultValue={data[property]}
        onChange={event => data[property] = event.target.value}
      />
    )
  }
}

const ChangeFields = (props) => {
  const selectedArr = props.selectedRows;

  if (selectedArr == null) {
    return null;
  }

  return (
    selectedArr.map(row => {
      const data = row.values;

      /*
       * -DMC Hack b/c phone isn't in values
       */
      data['phone'] = row.original['phone'];

      let fields = []

      for (const property in data) {
        fields.push(
          <CContainer key={property}>
            <CRow className="g-1 p-1 align-items-center">
              <CCol md="3">
                <CFormLabel className="col-sm-1 p-1 col-form-label">
                  {formatEntryName(property)}
                </CFormLabel>
              </CCol>
              <CCol md="8">
                <FormatEntrySet property={property} data={data} />
              </CCol>
            </CRow>
          </CContainer>
        )
      }

      fields.push(
        <CContainer key='notes'>
          <CRow>
            <CFormLabel>Notes</CFormLabel>
            <CFormTextarea rows="2" />
          </CRow>
        </CContainer>
      );

      return fields;
    })
  )
}

const RowEditModal = (props) => {
  const tableData = props.data;
  const setTableData = props.setData;
  let selected = props.selected;

  // Visibility of the row edit modal
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <CButton
        color="primary"
        variant="outline"
        className='me-2'
        disabled={isEmpty(selected)}
        onClick={() => setModalVisible(!modalVisible)}
      >
        <BsSliders />
        &nbsp;&nbsp;Edit
      </CButton>

      <CModal visible={modalVisible} backdrop='static' onClose={() => setModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>
            Edit Entry
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <ChangeFields selectedRows={selected} />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary"
            onClick={() => {
              setModalVisible(false);
            }}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={() => {
            applyChanges(tableData, selected, setTableData);
            setModalVisible(false);
          }}>
            Apply
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

RowEditModal.propTypes = {
  selected: PropTypes.array
}

export default RowEditModal
