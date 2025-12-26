import React, { useState } from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { Card, Button, Alert, message } from 'antd'

const Tracking = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleTransactionTracking = async () => {
    setIsLoading(true)
    try {
      await appboxoSdk.track({
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
              name: 'Product',
              description: 'Product description',
              price: 8.80,
              amount: 1,
              total: 8.80,
              package_id: 1232
            }
          ]
        }
      })

      message.success('Successfully sent!');
    } catch (error) {
      setError(error)
    }
    setIsLoading(false)
  }

  const handleClose = () => {
    setError(null)
  };

  return (
    <Card
      title="Transaction tracking"
    >
      {error && <Alert
        message="Error sending"
        description={`${JSON.stringify(error)}`}
        type="error"
        closable
        afterClose={handleClose}
      />}

      <Button
        className="wrap-button"
        size="large"
        block
        loading={isLoading}
        onClick={handleTransactionTracking}
      >{isLoading ? 'Sending...' : 'Send transaction tracking event'}</Button>
    </Card>
  )
}

export default Tracking
