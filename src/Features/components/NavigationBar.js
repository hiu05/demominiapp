import React, { useState } from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { Card, Button } from 'antd'
import LoggerContext from '../../LoggerContext.js'

const NavigationBar = () => {
  const { updateLogs } = React.useContext(LoggerContext)
  const [isLight, setIsLight] = useState(false)

  const showLightNavBar = () => {
    setIsLight(true)
    updateLogs({
      action: 'AppBoxoWebAppSetNavigationBar',
      message: 'called with light color options'
    })
    appboxoSdk.send('AppBoxoWebAppSetNavigationBar', {
      title: 'Light nav bar',
      backButton: true,
      background: '#ffffff',
      frontColor: '#000000',
      isBackgroundTransparent: false,
      frontColorWhenTransparent: '#000000',
      changeBackgroundOnScroll: false,
      show: true
    })
  }

  const showDarkNavBar = () => {
    setIsLight(false)
    updateLogs({
      action: 'AppBoxoWebAppSetNavigationBar',
      message: 'called with dark color options'
    })
    appboxoSdk.send('AppBoxoWebAppSetNavigationBar', {
      title: 'Dark nav bar',
      backButton: true,
      background: '#012d38',
      frontColor: '#ffffff',
      isBackgroundTransparent: false,
      frontColorWhenTransparent: '#ffffff',
      changeBackgroundOnScroll: false,
      show: true
    })
  }

  const changeNavBarTitle = () => {
    updateLogs({
      action: 'AppBoxoWebAppSetNavigationBar',
      message: 'called to change title'
    })
    appboxoSdk.send('AppBoxoWebAppSetNavigationBar', {
      title: 'Custom title'
    })
  }

  const hideNavBar = () => {
    updateLogs({
      action: 'AppBoxoWebAppSetNavigationBar',
      message: 'called to hide it'
    })
    appboxoSdk.send('AppBoxoWebAppSetNavigationBar', {
      show: false,
      ...(!isLight && {
        background: '#ffffff',
        frontColor: '#000000'
      })
    })
  }

  const handleTransparentNavbar = () => {
    updateLogs({
      action: 'AppBoxoWebAppSetNavigationBar',
      message: 'called with transparent bg options'
    })
    appboxoSdk.send('AppBoxoWebAppSetNavigationBar', {
      title: 'Nav bar with no initial background',
      backButton: true,
      background: '#000000',
      frontColor: '#ffffff',
      isBackgroundTransparent: true,
      frontColorWhenTransparent: '#000000',
      changeBackgroundOnScroll: true,
      show: true
    })
  }

  return (
    <Card
      title="NavigationBar"
    >
      <Button
        size="large"
        block
        onClick={showDarkNavBar}
      >Show dark navigation bar</Button>
      <Button
        size="large"
        block
        onClick={showLightNavBar}
      >Show light navigation bar</Button>
      <Button
        size="large"
        block
        className="wrap-button"
        onClick={handleTransparentNavbar}
      >Show navigation bar with transparent background</Button>
      <Button
        size="large"
        block
        onClick={changeNavBarTitle}
      >Change navigation bar title</Button>
      <Button
        size="large"
        block
        onClick={hideNavBar}
      >Hide navigation bar</Button>
    </Card>
  )
}

export default NavigationBar
