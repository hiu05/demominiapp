import React, { useState, useEffect } from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { Card, Button, Typography } from 'antd'

const { Text } = Typography

const Compass = () => {
  const [isStarted, setIsStarted] = useState(false)
  const [data, setData] = useState(null)
  const startCompasss = async () => {
    const response = await appboxoSdk.sendPromise('AppBoxoWebAppStartCompass')

    console.log(response)
    setIsStarted(true)
  }

  const stopCompass = async () => {
    const response = await appboxoSdk.sendPromise('AppBoxoWebAppStopCompass')

    console.log(response)
    setIsStarted(false)
  }

  useEffect(() => {
     const compassSubscription = event => {
      if (!event.detail) {
        return
      }

      const { type, data } = event.detail

      if (type === 'AppBoxoWebAppOnCompassChange') {
        setData(JSON.stringify(data))
      }
    }

    appboxoSdk.subscribe(compassSubscription)
    return () => {
      appboxoSdk.unsubscribe(compassSubscription)
    }
  }, [])

  return (
    <Card
      title="Compass"
    >
      {isStarted ? <Button
        className="wrap-button"
        size="large"
        block
        onClick={stopCompass}
      >Stop</Button> : <Button
        className="wrap-button"
        size="large"
        block
        onClick={startCompasss}
      >Start</Button>}
      <Text type="secondary">Data: </Text>
      {data && <div className="code-block">
        {data}
      </div>}
    </Card>
  )
}

export default Compass
