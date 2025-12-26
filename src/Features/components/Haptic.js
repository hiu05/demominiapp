import React from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { Card, Button } from 'antd'

const Haptic = () => {
  const vibrate = (style) => {
    appboxoSdk.send('AppBoxoWebAppVibrate', {
      style
    })
  }

  return (
    <Card
      title="Haptic feedback"
    >
      <Button
        size="large"
        block
        onClick={() => vibrate('light')}
      >Light vibrate</Button>
      <Button
        size="large"
        block
        onClick={() => vibrate('medium')}
      >Medium vibrate</Button>
      <Button
        size="large"
        block
        onClick={() => vibrate('heavy')}
      >Heavy vibrate</Button>
    </Card>
  )
}

export default Haptic
