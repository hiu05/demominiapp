import React, { useState, useEffect } from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { Card, Typography } from 'antd'

const { Text } = Typography

const OnRestore = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
     const onRestoreSubscription = event => {
      if (!event.detail) {
        return
      }

      const { type } = event.detail

      if (type === 'AppBoxoWebAppOnRestore') {
        setData(`Miniapp is restored on: ${new Date()}`)
      }
    }

    appboxoSdk.subscribe(onRestoreSubscription)
    return () => {
      appboxoSdk.unsubscribe(onRestoreSubscription)
    }
  }, [])

  return (
    <Card
      title="Miniapp on restore"
    >
      <Text type="secondary">Status: </Text>
      {data && <div className="code-block">
        {data}
      </div>}
    </Card>
  )
}

export default OnRestore
