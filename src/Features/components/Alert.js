import React, { useState } from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { Card, Button, Typography } from 'antd'

const { Text } = Typography

const ALERT_BUTTONS = [
  {
    id: 1,
    text: 'Cancel',
    role:'destructive'
  },
  {
    id: 2,
    text: 'Ok'
  }
]

const Alert = () => {
  const [response, setResponse] = useState('')

  const showAlert = async () => {
    const data = await appboxoSdk.sendPromise('AppBoxoWebAppShowAlert', {
      header: 'Native alert',
      message: 'This is a native alert box.',
      buttons: ALERT_BUTTONS
    })

    // Selected button
    const selectedButton = ALERT_BUTTONS.find(item => item.id === data.id)
    setResponse(selectedButton.text)
  }

  return (
    <Card
      title="Alert"
    >
      <Button
        size="large"
        block
        onClick={showAlert}
      >Show alert</Button>
      <Text type="secondary">Response: </Text>
      <Text type="warning">{response}</Text>
    </Card>
  )
}

export default Alert
