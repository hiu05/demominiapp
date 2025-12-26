import React, { useState } from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { Card, Button, Typography, Divider } from 'antd'
const { Text } = Typography

const Clipboard = () => {
  const [clipboard, setClipboard] = useState('')
  const [status, setStatus] = useState('')

  const getClipboard = async () => {
    const response = await appboxoSdk.sendPromise('AppBoxoWebAppGetClipboard');

    setClipboard(response.data)
  };

  const setClipboardData = async () => {
    const response = await appboxoSdk.sendPromise('AppBoxoWebAppSetClipboard', {
      data: 'this is from clipboard'
    });

    setStatus(response.result ? 'Success' : 'Failed')
  }

  return (
    <Card
      title="System clipboard"
    >
      <Button
        size="large"
        block
        onClick={getClipboard}
      >Get clipboard data</Button>
      <Text type="secondary">Clipboard: </Text>
      <Text type="warning">{clipboard}</Text>
      <Divider />
      <Button
        size="large"
        block
        onClick={setClipboardData}
      >Set clipboard</Button>
      <Text type="secondary">Status: </Text>
      <Text type="warning">{status}</Text>
    </Card>
  )
}

export default Clipboard
