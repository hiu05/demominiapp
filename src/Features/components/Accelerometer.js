import React, { useState, useEffect } from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { Card, Button, Typography } from 'antd'

const { Text } = Typography

const Accelerometer = () => {
  const [isStarted, setIsStarted] = useState(false)
  const [data, setData] = useState(null)
  const startAccelerometer = async () => {
    const response = await appboxoSdk.sendPromise('AppBoxoWebAppStartAccelerometer', {
      interval: 200
    })

    console.log(response)
    setIsStarted(true)
  }

  const stopAccelerometer = async () => {
    const response = await appboxoSdk.sendPromise('AppBoxoWebAppStopAccelerometer')

    console.log(response)
    setIsStarted(false)
  }

  useEffect(() => {
     const accelerometerSubscription = event => {
      if (!event.detail) {
        return
      }

      const { type, data } = event.detail

      if (type === 'AppBoxoWebAppOnAccelerometerChange') {
        setData(JSON.stringify(data))
      }
    }

    appboxoSdk.subscribe(accelerometerSubscription)
    return () => {
      appboxoSdk.unsubscribe(accelerometerSubscription)
    }
  }, [])

  return (
    <Card
      title="Accelerometer"
    >
      {isStarted ? <Button
        className="wrap-button"
        size="large"
        block
        onClick={stopAccelerometer}
      >Stop</Button> : <Button
        className="wrap-button"
        size="large"
        block
        onClick={startAccelerometer}
      >Start</Button>}
      <Text type="secondary">Data: </Text>
      {data && <div className="code-block">
        {data}
      </div>}
    </Card>
  )
}

export default Accelerometer
