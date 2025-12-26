import React, { useState, useEffect } from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { Card, Button, Typography } from 'antd'
const { Text } = Typography;

const IMAGES = [
  'https://images.unsplash.com/photo-1586854399870-334a91a284e8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1554629907-479bff71f153?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
  'https://images.unsplash.com/photo-1586894171656-22b578db1daa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=695&q=80',
  'https://images.unsplash.com/photo-1586699106152-befa2c59681c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=619&q=80'
]

const ImageGallery = () => {
  const [response, setResponse] = useState('')

  const showImageGalleryListener = (event) => {
    if (!event.detail) {
      return;
    }
  
    const { type, data } = event.detail;
  
    if (type === 'AppBoxoWebAppShowImages') {
      setResponse(data.success ? 'Success' : 'Failed')
    }
  }

  useEffect(() => {
    appboxoSdk.subscribe(showImageGalleryListener)

    return () => {
      appboxoSdk.unsubscribe(showImageGalleryListener)
    }
  }, [])

  const showGallery = () => {
    appboxoSdk.send('AppBoxoWebAppShowImages', {
      images: IMAGES
    })
  }

  return (
    <Card
      title="Image gallery"
    >
      <Button
        size="large"
        block
        onClick={showGallery}
      >Show image gallery</Button>
      <Text type="secondary">Result: </Text>
      <Text type="warning">{response}</Text>
    </Card>
  )
}

export default ImageGallery
