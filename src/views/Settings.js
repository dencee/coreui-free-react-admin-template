import React, { useRef, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormLabel,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import arjunaLogo from 'src/assets/images/arjunaLogin.png'

import { auth } from "src/firebase";
import { useAuth } from "src/contexts/AuthContext"
import { useHistory } from "react-router-dom"

const Settings = () => {
  const { sendPasswordReset } = useAuth()
  const [error, setError] = useState("")

  const getUserInfo = () => {
    let userInfo = {};
    const user = auth.currentUser;

    if (user !== null) {
      // The user object has basic properties such as display name, email, etc.
      const displayName = user.displayName;
      const email = user.email;
      const photoURL = user.photoURL;
      const emailVerified = user.emailVerified;

      // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
      const uid = user.uid;

      userInfo = {
        displayName: user.displayName,
        email: user.email,
        //photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        //uid: user.uid,
      }
    }

    return userInfo;
  }

  const showError = () => {
    const isError = error.toLowerCase().includes('error');

    return (
      isError ?
        <CAlert color="danger">
          ERROR: {error}
        </CAlert>
      : <CAlert color="success">
          SUCCESS: {error}
        </CAlert>
    )
  }

  async function handleSubmit(e) {
    console.log('Handling change password submit')

    e.preventDefault()
    setError("")
    const email = getUserInfo().email

    if( email ){
      try {
        await sendPasswordReset(email)
        setError("Password reset send to: " + email)
      } catch (errorMessage) {
        setError("Error: Failed to send password reset e-mail")
        console.log("Password change ERROR!!!" + errorMessage)
      }
    } else {
      setError("Error: Invalid e-mail")
    }
  }

  return (
    <div className="d-flex flex-row align-items-center">
      <CContainer>
      <CRow className="justify-content-center">
          <CCol md={8}>
            <CCard className="p-4">
              <h2>Change Password</h2>
            </CCard>
          </CCol>
        </CRow>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCard className="p-4">
              <CCardBody>
                <CForm onSubmit={handleSubmit}>
                  <CFormLabel className="mb-3 col-form-label">E-Mail: {getUserInfo().email}</CFormLabel>
                  <CRow>
                    <CCol xs={6}>
                      <CButton type="submit" color="primary" className="px-4">
                        Send Password Reset Email
                      </CButton>
                    </CCol>
                  </CRow>
                  <CRow md={8}>
                    <CCol>
                      <br></br>
                      {error && showError()}
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Settings
