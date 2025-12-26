import React from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { Card, Button } from 'antd'
import { StoreContext } from '../../StoreContext'

const ActionButtons = () => {
  const store = React.useContext(StoreContext)

  const toggleActionButtonTheme = () => {
    store.isLightActionButtons = !store.isLightActionButtons
    appboxoSdk.send('AppBoxoWebAppSetActionButton', {
      isLight: store.isLightActionButtons
    })
  }

  return (
    <Card
      title="Action buttons"
    >
      <Button
        className="wrap-button"
        size="large"
        block
        onClick={toggleActionButtonTheme}
      >Toggle action buttons' theme</Button>
    </Card>
  )
}

export default ActionButtons
