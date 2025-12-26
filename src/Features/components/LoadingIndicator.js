import React from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { Card, Button } from 'antd'

const LoadingIndicator = () => {
  const showLoadingIndicatorWithTimeout = () => {
    appboxoSdk.send('AppBoxoWebAppLoadingIndicator', {
      show: true
    })

    setTimeout(() => {
      appboxoSdk.send('AppBoxoWebAppLoadingIndicator', {
        show: false
      })
    }, 10000);
  }

  const showLoadingIndicator = () => {
    appboxoSdk.send('AppBoxoWebAppLoadingIndicator', {
      show: true
    })
  }

  return (
    <Card
      title="Loading indicator"
    >
      <Button
        size="large"
        block
        onClick={showLoadingIndicatorWithTimeout}
        className="wrap-button"
      >Show loading indicator and hide it after 10 seconds</Button>
      <Button
        size="large"
        block
        onClick={showLoadingIndicator}
        className="wrap-button"
      >Show loading indicator without hiding it</Button>
      <p>Loading indicator will show an alert to close it after 30 seconds if no changing event is dispatched</p>
    </Card>
  )
}

export default LoadingIndicator
