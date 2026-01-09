import React, { useState, useEffect } from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { Card, Button, Typography } from 'antd'
import LoggerContext from '../LoggerContext.js'
import { message } from 'antd'

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

  const showGallery = async () => {  
    //miniapp tự tạo order + orderpaymentid
    const order = await fetch('https://jemma-indefatigable-tomika.ngrok-free.dev/api/v1/miniappserver/order-payment-id',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          app_id: localStorage.getItem('app_id'),
          client_id: localStorage.getItem('client_id'),
          amount: 199.00,
          currency: "USD",
        })
      }
    )
    //gọi 
    const payResult = appboxoSdk.pay({paymentData:{
      amount: order.amount,
      miniappOrderId: order.id,
      currency: order.currency,
      transactionToken: order.orderPaymentId,
      extraParams: {}
    }}).json()
 
    updateLogs({
      action: 'Payment call', 
      message: 'request sent',
      data: payResult
    })

    message.info('Payment request reviced: ' + payResult)
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
