import { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '../services/api'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('kosowa_token')
    if (token) {
      authAPI.getMe()
        .then(data => setUser({
          id: data._id,
          name: data.name,
          username: data.username,
          email: data.email,
        }))
        .catch(() => {
          localStorage.removeItem('kosowa_token')
          setUser(null)
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const signIn = async (form) => {
    const data = await authAPI.login(form)
    localStorage.setItem('kosowa_token', data.token)
    setUser({
      id: data.user.id,
      name: data.user.name,
      username: data.user.username,
      email: data.user.email,
    })
    return data
  }

  const signUp = async (form) => {
    const data = await authAPI.register(form)
    localStorage.setItem('kosowa_token', data.token)
    setUser({
      id: data.user.id,
      name: data.user.name,
      username: data.user.username,
      email: data.user.email,
    })
    return data
  }

  const signOut = () => {
    localStorage.removeItem('kosowa_token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
