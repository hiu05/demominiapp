import React, { useState } from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { useHistory } from 'react-router-dom';

import Preloader from '../components/Preloader.js'
import LoginResponse from '../components/LoginResponse.js'
import AuthContext from '../AuthContext.js'
import LoggerContext from '../LoggerContext.js'

import { Button } from 'antd'


import './Account.scss'

const LOGIN_SUCCESS = 'success'
const LOGIN_FAILED = 'error'
const LOGIN_NONE = ''

const Account = () => {
  let history = useHistory();
  const { loginStatus, setLoginStatus } = React.useContext(AuthContext)
  const { updateLogs } = React.useContext(LoggerContext)

  const [isLoading, setIsLoading] = useState(false)
  const [loginResponseStatus, setLoginResponseStatus] = useState(LOGIN_NONE)

  const handleLogin = async () => {
    try {
      updateLogs({
        action: 'LOGIN_TO_DASHBOARD',
        message: 'request sent',
      })
      const token = await appboxoSdk.login()

      setLoginStatus(true)

      updateLogs({
        action: 'LOGIN_TO_DASHBOARD',
        message: 'response received',
        data: token
      })

      setLoginResponseStatus(LOGIN_SUCCESS)
    } catch (error) {
      console.log(error)

      updateLogs({
        action: 'LOGIN_TO_DASHBOARD',
        message: error.status === 'Reject' ? 'login confirm modal rejected' : 'request failed',
        data: error
      })

      setLoginResponseStatus(error.status === 'Reject' ? LOGIN_NONE : LOGIN_FAILED)
    }

    setTimeout(() => {
      setIsLoading(false)
    }, 400)
  }

  const handleLogout = async () => {
    setIsLoading(true)
    updateLogs({
      action: 'LOGOUT',
      message: 'request sent',
    })

    // Logout
    try {
      await appboxoSdk.logout()
      console.log('Resolved')
      setLoginStatus(false)

      updateLogs({
        action: 'LOGOUT',
        message: 'response received',
      })
    } catch (error) {
      console.log('Logout error: ', error)

      updateLogs({
        action: 'LOGOUT',
        message: 'request failed',
        data: error
      })
    }

    setIsLoading(false)
  }

  const handleTryAgain = () => {
    setLoginResponseStatus(LOGIN_NONE)

    handleLogin()
  }

  const handleGoBack = () => {
    history.replace('/')

    updateLogs({
      action: 'REDIRECT',
      message: 'to home'
    })
  }

  return loginResponseStatus ? (
    <>
      <LoginResponse
        isSuccessful={loginStatus}
        onContinue={() => setLoginResponseStatus(LOGIN_NONE)}
        onTryAgain={handleTryAgain}
      />
      {isLoading && <Preloader />}
    </>
  ) : (
    <section className="pane account">
      <div>
        <h1>Account details</h1>
        <div className="account__email">
          Status: <b>{loginStatus ? 'Logged in' : 'Not logged in'}</b>
        </div>
      </div>
      <div>
        {loginStatus ? (
          <Button
            type="danger"
            size="large"
            onClick={handleLogout}
            block
          >Logout</Button>
        ) : (
          <Button
            type="primary"
            size="large"
            onClick={handleLogin}
            block
          >Login</Button>
        )}
        <Button
          size="large"
          block
          onClick={handleGoBack}
        >Back</Button>
      </div>
      {isLoading && <Preloader />}
    </section>
  )
}

export default Account
