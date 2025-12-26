import React, { useState } from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { Card, Button, Typography, Divider } from 'antd'
const { Text } = Typography

const GeoData = () => {
  const [position, setPosition] = useState(null)
  const [openStatus, setOpenStatus] = useState('')
  const [location, setLocation] = useState('')

  const requestGeoposition = async () => {
    appboxoSdk.send('AppBoxoWebAppLoadingIndicator', {
      show: true
    })

    const data = await appboxoSdk.sendPromise('AppBoxoWebAppGetGeodata')

    appboxoSdk.send('AppBoxoWebAppLoadingIndicator', {
      show: false
    })

    setPosition({
      isAvailable: !!data.available,
      lat: parseFloat(data.lat),
      long: parseFloat(data.long)
    })
  }

  const formatPosition = () => {
    if (position) {
      return position.isAvailable ? `Lat: ${position.lat}, Long: ${position.long}` : 'Rejected'
    } else {
      return 'unknown'
    }
  }

  const openLocation = async () => {
    const data = await appboxoSdk.sendPromise('AppBoxoWebAppOpenLocation', {
      latitude: 1.290270,
      longitude: 103.851959
    });

    setOpenStatus(data.result ? 'Success' : 'Failed')
  };

  const chooseLocation = async () => {
    const data = await appboxoSdk.sendPromise('AppBoxoWebAppChooseLocation');

    setLocation(JSON.stringify(data))
  };

  return (
    <Card
      title="Geoposition"
    >
      <Button
        size="large"
        block
        onClick={requestGeoposition}
      >Request qeo position</Button>
      <Text type="secondary">Your geo position: </Text>
      <Text type="warning">{formatPosition()}</Text>
      <Divider />
      <Button
        size="large"
        block
        onClick={openLocation}
      >Open location</Button>
      <Text type="secondary">Status: {openStatus}</Text>
      <Divider />
      <Button
        size="large"
        block
        onClick={chooseLocation}
      >Choose location</Button>
      <Text type="secondary">Location: </Text>
      {location && <div className="code-block">
        {location}
      </div>}
    </Card>
  )
}

export default GeoData
