// https://www.youtube.com/watch?v=PKwu15ldZ7k
// https://github.com/WebDevSimplified/React-Firebase-Auth
import React, { useContext, useState, useEffect } from "react"
import {
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
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

  const logout = async () => {
    await signOut(auth)
  }

  const sendPasswordReset = async (email) => {
    await sendPasswordReset(auth, email)
  }

  const updatePassword = async (newPassword) => {
    //currentUser.updatePassword(newPassword)
    updatePassword(currentUser, newPassword)
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
    updatePassword,
    sendPasswordReset,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}