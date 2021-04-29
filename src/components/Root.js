import Router from "./Router"
import {useEffect, useState} from "react"

const Root = () => {

  const [token, setToken] = useState(String(localStorage.getItem('token') || -1))
  const [refreshToken, setRefreshToken] = useState(String(localStorage.getItem('refresh_token') || -1))
  const [login, setLogin] = useState(String(localStorage.getItem("login") || "-1"))

  const monitorSessionChange = (tokenParam, refreshTokenParam, loginParam) => {
    setToken(token => tokenParam)
    setRefreshToken(refresh_token => refreshTokenParam)
    setLogin(login => loginParam)
  }

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  useEffect(() => {
    localStorage.setItem('login', login)
  }, [login])

  useEffect(() => {
    localStorage.setItem('refresh_token', refreshToken)
  }, [refreshToken])


  return (
    <>
      <Router monitorSessionChange={monitorSessionChange} login={login}/>
    </>
  )
}

export default Root