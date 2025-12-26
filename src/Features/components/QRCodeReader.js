import React, { useEffect, useState } from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { Card, Button } from 'antd'

const QRCodeReader = () => {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const qrCodeSubscription = event => {
      if (!event.detail) {
        return;
      }

      const { type, data } = event.detail;

      if (type === 'AppBoxoWebAppOpenQRCodeReaderResult') {
        // Reading result of the QR Code Reader
        setCode(data.code_data)
        setError('')
      }

      if (type === 'AppBoxoWebAppOpenQRCodeReaderFailed') {
        // Catching the error
        setError(data.error_data)
        setCode('')
      }
    }

    appboxoSdk.subscribe(qrCodeSubscription);
    return () => {
      appboxoSdk.unsubscribe(qrCodeSubscription);
    };
  }, [])

  const openReader = () => {
    appboxoSdk.send('AppBoxoWebAppOpenQRCodeReader');
  }

  return (
    <Card
      title="QR code reader"
    >
      <Button
        size="large"
        block
        onClick={openReader}
        className="wrap-button"
      >Open QR code reader</Button>
      <p>
        QR code result: <br/>
        <strong>{error ? `Error: ${error}` : code ? `Success: ${code}` : 'No data received'}</strong>
      </p>
    </Card>
  )
}

export default QRCodeReader
