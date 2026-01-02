import React, { useState, useEffect } from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { Card, Button, Typography } from 'antd'
import LoggerContext from '../LoggerContext.js'

const { Text } = Typography;

const AppboxoPay = () => {
  const [response, setResponse] = useState('')
  const { updateLogs } = React.usecontext(LoggerContext)
  const appboxoPaymentStatusHandler = (event) => {
    if (!event.detail) {
      console.log('No event detail found')
      return;
    }
    updateLogs({
        action: 'Payment call',
        message: 'request sent',
        data: event
    })
    const { type, data } = event.detail;
  
    if (type === 'AppBoxoWebAppPay') {
      setResponse(data.status)
    }
  }

  useEffect(() => {
    appboxoSdk.subscribe(appboxoPaymentStatusHandler)

    return () => {
      appboxoSdk.unsubscribe(appboxoPaymentStatusHandler)
    }
  }, [])
  
  const showGallery = () => {

    appboxoSdk.send('AppBoxoWebAppPay', {
      amount: 199.00,
      orderId: "123124dfsafdafdsfafdadfsfa",
      currency: "USD",
      extraParams: {}
    })
  }

  return (
    <Card
      title="AppboxoPay"
    >
      <Button
        size="large"
        block
        onClick={showGallery}
      >Call AppboxoPay</Button>
      <Text type="secondary">Result: </Text>
      <Text type="warning">{response}</Text>
    </Card>
  )
}

export default AppboxoPay
