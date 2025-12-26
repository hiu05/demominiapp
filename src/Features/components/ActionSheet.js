import React, { useState, useEffect } from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { Card, Button, Typography } from 'antd'
const { Text } = Typography;

const LIST = [
  {
    id: 1,
    text: 'Delete',
    role:'destructive'
  },
  {
    id: 2,
    text: 'Selected',
    role:'selected'
  },
  {
    id: 3,
    text: 'Share',
  },
  {
    id: 4,
    text: 'Play',
  },
  {
    id: 5,
    text: 'Cancel',
    role: 'cancel'
  }
]

const ActionSheet = () => {
  const [response, setResponse] = useState('')

  const actionSheetListener = (event) => {
    if (!event.detail) {
      return;
    }
  
    const { type, data } = event.detail;
  
    if (type === 'AppBoxoWebAppActionSheetItemClick') {
      if (data.id) {
        const selected = LIST.find(item =>item.id === data.id)
        setResponse(selected.text)
      }
    }
  }

  useEffect(() => {
    appboxoSdk.subscribe(actionSheetListener)

    return () => {
      appboxoSdk.unsubscribe(actionSheetListener)
    }
  }, [])

  const showActionSheet = () => {
    appboxoSdk.send('AppBoxoWebAppShowActionSheet', {
      header: 'Albums',
      list: LIST
    })
  }

  return (
    <Card
      title="Action sheet"
    >
      <Button
        size="large"
        block
        onClick={showActionSheet}
      >Show action sheet</Button>
      <Text type="secondary">Selected action sheet item: </Text>
      <Text type="warning">{response}</Text>
    </Card>
  )
}

export default ActionSheet
