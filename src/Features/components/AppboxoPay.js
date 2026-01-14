import React, { useState, useEffect } from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { Card, Button, Typography } from 'antd'
import LoggerContext from '../../LoggerContext.js'

const { Text } = Typography;

const AppboxoPay = () => {
  const [response, setResponse] = useState('')
  const { updateLogs } = React.useContext(LoggerContext)

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
    const { type } = event.detail;

    if (type === 'AppBoxoWebAppPay') {
      setResponse(event)
    }
  }

  useEffect(() => {
    appboxoSdk.subscribe(appboxoPaymentStatusHandler)

    return () => {
      appboxoSdk.unsubscribe(appboxoPaymentStatusHandler)
    }
  }, [])
  const formpay = {
    amount: 88,
    currency: 'usd'
  }
  const showGallery = async () => {
    //miniapp tự tạo order + orderpaymentid
    const res = await fetch('https://jemma-indefatigable-tomika.ngrok-free.dev/api/v1/miniappserver/order-payment-id',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          app_id: localStorage.getItem('app_id'),
          client_id: localStorage.getItem('client_id'),
          order: {
            amount: formpay.amount,
            currency: formpay.currency,
          },
          hostAppUserId: localStorage.getItem('userId')
        })
      }
    )
    const order = await res.json()
    updateLogs({
      action: 'Payment call',
      message: 'request sent',
      data: order
    })
    //gọi 
    const payResult = appboxoSdk.send('AppBoxoWebAppPay',{
      amount: order.amount,
      miniappOrderId: order.id,
      currency: order.currency,
      transactionToken: order.order_payment_id,
      extraParams: {}
    })
    const transaction = {
        action: 'transaction',
        payload: {
          shipping: 5,
          tax: 0.57,
          discount: 2.25,
          currency_code: 'USD',
          customer: {
            first_name: 'John',
            last_name: 'Doe',
            email: 'jdoe@domain.com',
            ip_address: '234.192.4.75'
          },
          items: [
            {
              name: 'Product1',
              description: 'Product description',
              price: 8.80,
              amount: 1,
              total: 8.80,
            },
            {
              name: 'Product2',
              description: 'Product description',
              price: 70,
              amount: 1,
              total: 70,
            }
          ]
        }
    }
    if (order.status) {
      await appboxoSdk.track(transaction)
    }
    

    updateLogs({
      action: 'Payment callddd',
      message: 'request sent',
      data: payResult
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
