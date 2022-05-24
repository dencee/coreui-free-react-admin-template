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
  const { updatePassword } = useAuth()
  const [error, setError] = useState("")
  const [currentpasswordValue, setCurrentPasswordValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordValueConfirm, setPasswordValueConfirm] = useState("");
  const history = useHistory()

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
    console.log("LOGIN ERROR");

    return (
      <CAlert color="danger">
        ERROR: {error}
      </CAlert>
    )
  }

  async function handleSubmit(e) {
    console.log('Handling change password submit')

    e.preventDefault()
    setError("")

    if( passwordValue === passwordValueConfirm ){
      try {
        await updatePassword(passwordValue)
      } catch (errorMessage) {
        setError("Error: Failed to update password")
        console.log("Password change ERROR!!!" + errorMessage)
      }
    } else {
      setError("Error: Passwords do not match")
    }

    // https://stackoverflow.com/questions/37811684/how-to-create-credential-object-needed-by-firebase-web-user-reauthenticatewith
    // import {
    //     EmailAuthProvider,
    //     getAuth,
    //     reauthenticateWithCredential,
    // } from 'firebase/auth'
  
    // const auth = getAuth()
    // const credential = EmailAuthProvider.credential(
    //     auth.currentUser.email,
    //     userProvidedPassword
    // )
    // const result = await reauthenticateWithCredential(
    //     auth.currentUser, 
    //     credential
    // )
    // // User successfully reauthenticated. New ID tokens should be valid.
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
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Current Password"
                      onChange={event => setCurrentPasswordValue(event.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                  <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="New Password"
                      onChange={event => setPasswordValue(event.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Re-type New Password"
                      onChange={event => setPasswordValueConfirm(event.target.value)}
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol xs={6}>
                      <CButton type="submit" color="primary" className="px-4">
                        Change Password
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
