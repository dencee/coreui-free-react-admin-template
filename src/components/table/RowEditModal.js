import React, { useState } from 'react'
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
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react'

import { BsSliders } from 'react-icons/bs';

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function formatEntryName(propertyStr) {
  return propertyStr.charAt(0).toUpperCase() + propertyStr.slice(1, propertyStr.length);
}

const formatEntrySet = (property, data, labels) => {

  // {statusLabels.map((val, idx) => (
  //   <CDropdownItem key={idx} href="#">{val}</CDropdownItem>
  // ))}

  // {indicationLabels.map((val, idx) => (
  //   <CDropdownItem key={idx} href="#">{val}</CDropdownItem>
  // ))}

  if (property.toLowerCase() === 'status') {
    const statusLabels = labels['statuses']

    return (
      <CDropdown>
        <CDropdownToggle color="secondary">{data[property]}</CDropdownToggle>
        <CDropdownMenu>

        </CDropdownMenu>
      </CDropdown>
    )
  } else if (property.toLowerCase() === 'indication') {
    const indicationLabels = labels['indications']

    return (
      <CDropdown>
        <CDropdownToggle color="secondary">{data[property]}</CDropdownToggle>
        <CDropdownMenu>

        </CDropdownMenu>
      </CDropdown>
    )
  } else if (property.toLowerCase() === 'dates') {
    //const dateLabels = labels['dates']
    return <CFormInput type="text" defaultValue={data[property]} />

  } else if (property.toLowerCase() === 'clients') {
    //const clientLabels = labels['clients']
    return <CFormInput type="text" defaultValue={data[property]} />

  } else {
    return <CFormInput type="text" defaultValue={data[property]} />
  }

}

const ChangeFields = (selectedRows, labels) => {
  const selectedArr = selectedRows.selectedRows;

  if (selectedArr == null) {
    return null;
  }

  return (
    selectedArr.map(row => {
      const originalData = row.original;

      let fields = []

      for (const property in originalData) {
        fields.push(
          <CContainer key={property}>
            <CRow className="g-1 p-1 align-items-center">
              <CCol md="3">
                <CFormLabel className="col-sm-1 p-1 col-form-label">
                  {formatEntryName(property)}
                </CFormLabel>
              </CCol>
              <CCol md="8">
                {formatEntrySet(property, originalData, labels)}
              </CCol>
            </CRow>
          </CContainer>
        )
      }

      return fields;
    })
  )
}

const RowEditModal = (props) => {
  const selected = props.selected;

  // Visibility of the row edit modal
  const [visible, setVisible] = useState(false);


  return (
    <>
      <CButton
        color="primary"
        variant="outline"
        disabled={isEmpty(selected)}
        onClick={() => setVisible(!visible)}
      >
        <BsSliders />
        &nbsp;&nbsp;Edit
      </CButton>

      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>
            Edit Entry
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <ChangeFields selectedRows={selected} labels={props.labels} />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary"
            onClick={() => {
              console.log("Cancelled");
              setVisible(false);
            }}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={() => {
            console.log("Applied");
            setVisible(false);
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
