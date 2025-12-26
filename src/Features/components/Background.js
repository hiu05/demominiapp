import React from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { Card, Button } from 'antd'

const WindowBackground = () => {
  const changeBackground = () => {
    appboxoSdk.send('AppBoxoWebAppSetBackgroundColor', {
      color: '#2CBBD7'
    })
  }

  return (
    <Card
      title="Background color"
    >
      <Button
        className="wrap-button"
        size="large"
        block
        onClick={changeBackground}
      >Change window background</Button>
    </Card>
  )
}

export default WindowBackground
