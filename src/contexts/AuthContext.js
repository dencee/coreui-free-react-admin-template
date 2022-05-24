// https://www.youtube.com/watch?v=PKwu15ldZ7k
// https://github.com/WebDevSimplified/React-Firebase-Auth
import React, { useContext, useState, useEffect } from "react"
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import FirebaseApp, { auth } from "src/firebase";

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  const login = async (email, password) => {
      await signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    return auth.signOut()
  }

  // const logout = async () => {
  //   await signOut(auth)
  // }

  const updateEmail = (email) => {
    currentUser.updateEmail(email)
  }

  const updatePassword = (password) => {
    currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(false);
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    logout,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}