import React, { useState, useEffect } from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { Card, Button, Typography } from 'antd'

const { Text } = Typography

const Gyroscope = () => {
  const [isStarted, setIsStarted] = useState(false)
  const [data, setData] = useState(null)
  const startGyroscope = async () => {
    const response = await appboxoSdk.sendPromise('AppBoxoWebAppStartGyroscope', {
      interval: 200
    })

    console.log(response)
    setIsStarted(true)
  }

  const stopGyroscope = async () => {
    const response = await appboxoSdk.sendPromise('AppBoxoWebAppStopGyroscope')

    console.log(response)
    setIsStarted(false)
  }

  useEffect(() => {
     const gyroscopeSubscription = event => {
      if (!event.detail) {
        return
      }

      const { type, data } = event.detail

      if (type === 'AppBoxoWebAppOnGyroscopeChange') {
        setData(JSON.stringify(data))
      }
    }

    appboxoSdk.subscribe(gyroscopeSubscription)
    return () => {
      appboxoSdk.unsubscribe(gyroscopeSubscription)
    }
  }, [])

  return (
    <Card
      title="Gyroscope"
    >
      {isStarted ? <Button
        className="wrap-button"
        size="large"
        block
        onClick={stopGyroscope}
      >Stop</Button> : <Button
        className="wrap-button"
        size="large"
        block
        onClick={startGyroscope}
      >Start</Button>}
      <Text type="secondary">Data: </Text>
      {data && <div className="code-block">
        {data}
      </div>}
    </Card>
  )
}

export default Gyroscope 
