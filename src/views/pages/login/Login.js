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
  CImage,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import arjunaLogo from 'src/assets/images/arjunaLogin.png'

import { useAuth } from "src/contexts/AuthContext"
import { useHistory } from "react-router-dom"

const Login = () => {
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const history = useHistory()

  const showError = () => {
    console.log("LOGIN ERROR");

    return (
      <CAlert color="danger">
        ERROR: {error}
      </CAlert>
    )
  }

  async function handleSubmit(e) {
    console.log('Handling submit')

    e.preventDefault()
    setError("")

    try {
      await login(emailValue, passwordValue)
      history.push("/")
    } catch (errorMessage) {
      
      setError("Invalid login/password combination")
      console.log("LOGIN ERROR!!!" + errorMessage)
    }
  }

  return (
    <div className="bg-dark min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={4}>
            <CCard className="p-4">
              <CImage fluid src={arjunaLogo} />
            </CCard>
          </CCol>
        </CRow>
        <CRow className="justify-content-center">
          <CCol md={4}>
            <CCard className="p-4">
              <CCardBody>
                <CForm onSubmit={handleSubmit}>
                  <h1>Login</h1>
                  <p className="text-medium-emphasis">Sign In to your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      autoComplete="username"
                      onChange={event => setEmailValue(event.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="current-password"
                      onChange={(event) => setPasswordValue(event.target.value)}
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol xs={6}>
                      <CButton type="submit" color="primary" className="px-4">
                        Login
                      </CButton>
                    </CCol>
                    {/* <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol> */}
                  </CRow>
                  <CRow md={4}>
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

export default Login
