import React, { useState, useEffect } from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { Card, Button, Typography } from 'antd'
const { Text } = Typography;

const AppboxoPay = () => {
  const [response, setResponse] = useState('')

  const appboxoPaymentStatusHandler = (event) => {
    if (!event.detail) {
      return;
    }
  
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
      orderId: "TM121248847",
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
