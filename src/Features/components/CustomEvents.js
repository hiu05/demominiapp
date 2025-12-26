import React, {useState} from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { Card, Button, message } from 'antd'

const CustomEvents = () => {
  const [data, setData] = useState(null)

  const handleSend = () => {
    appboxoSdk.send('AppBoxoWebAppCustomEvent', {
      type: 'my_custom_event_to_open_notification',
      payload: {
        message: 'Hey, this is coming from custom event!'
      }
    })
  }

  const handleSendWithNoBody = () => {
    appboxoSdk.send('AppBoxoWebAppCustomEvent', {
      type: 'my_custom_event_to_open_notification_with_no_body',
    })
  }

  const handleSendWithPromise = () => {
    appboxoSdk.sendPromise('AppBoxoWebAppCustomEvent', {
      type: 'my_custom_event_to_open_confirm',
      payload: {
        message: 'Hey, this is coming from custom event!'
      }
    }).then(() => {
      message.success('Successfully confirmed!');
    }).catch(() => {
      message.error('Confirmation rejected!');
    })
  }

  appboxoSdk.subscribe(event => {
    if (!event.detail) {
      return;
    }

    const { type, data } = event.detail;

    if (type === 'AppBoxoWebAppCustomEvent') {
      setData(data)
    }
  });

  return (
    <Card
      title="Sending custom events"
    >
      <Button
        size="large"
        block
        onClick={handleSendWithNoBody}
        className="wrap-button"
      >Send custom event to open notification</Button>
      <Button
        size="large"
        block
        onClick={handleSend}
        className="wrap-button"
      >Send custom event to open notification with message</Button>
      <Button
        size="large"
        block
        onClick={handleSendWithPromise}
        className="wrap-button"
      >Send custom event to open confirmation</Button>
      <p>Custom event received on the minapp: </p>
      <p>event type: <strong>{data && data.type ? ` ${data.type}` : 'No type received'}</strong></p>
      <p>event payload: <strong>{data && data.payload ? ` ${JSON.stringify(data.payload)}` : 'No payload received'}</strong></p>
    </Card>
  )
}

export default CustomEvents
