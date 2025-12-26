import React, { useState } from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { Card, Button, Typography, Divider } from 'antd'

const { Text } = Typography

const Storage = () => {
  const [saveStatus, setSaveStatus] = useState('')
  const [storageKeys, setStorageKeys] = useState([])
  const [savedData, setSavedData] = useState('')
  const [removeStatus, setRemoveStatus] = useState('')
  const [clearStatus, setClearStatus] = useState('')

  const save = async () => {
    const response = await Promise.all([
      appboxoSdk.sendPromise('AppBoxoWebAppStorageSet', {
        key: 'username',
        value: 'John'
      }),
      appboxoSdk.sendPromise('AppBoxoWebAppStorageSet', {
        key: 'email',
        value: 'john@doe.com'
      })
    ])

    setSaveStatus(response.every(item => item.result) ? 'Success' : 'Failed')
  }

  const getKeys = async () => {
    const storageKeys = await appboxoSdk.sendPromise('AppBoxoWebAppStorageGetKeys', {
      count: 10
    })
    setStorageKeys(storageKeys.keys)
  }

  const getData = async () => {
    const userData = await appboxoSdk.sendPromise('AppBoxoWebAppStorageGet', {
      keys: ['username', 'email']
    });

    setSavedData(JSON.stringify(userData))
  }

  const removeItem = async () => {
    const response = await appboxoSdk.sendPromise('AppBoxoWebAppStorageRemove', {
      key: 'username'
    });

    setRemoveStatus(response.result ? 'Success' : 'Failed')
  }

  const clearStorage = async () => {
    const response = await appboxoSdk.sendPromise('AppBoxoWebAppStorageClear');

    setClearStatus(response.result ? 'Success' : 'Failed')
  }

  return (
    <Card
      title="Storage"
    >
      <Button
        className="wrap-button"
        size="large"
        block
        onClick={save}
      >Save username and email to storage</Button>
      <Text type="secondary">Status: </Text>
      <Text type="warning">{saveStatus}</Text>
      <Divider />
      <Button
        size="large"
        block
        onClick={getKeys}
      >Get saved storage keys</Button>
      <Text type="secondary">Storage keys: </Text>
      <Text type="warning">{storageKeys.join(', ')}</Text>
      <Divider />
      <Button
        size="large"
        block
        onClick={getData}
      >Get saved storage data</Button>
      <Text type="secondary">Saved data: </Text>
      {savedData && <div className="code-block">
        {savedData}
      </div>}
      <Divider />
      <Button
        className="wrap-button"
        size="large"
        block
        onClick={removeItem}
      >Remove username from storage</Button>
      <Text type="secondary">Status: </Text>
      <Text type="warning">{removeStatus}</Text>
      <Divider />
      <Button
        size="large"
        block
        onClick={clearStorage}
      >Clear storage</Button>
      <Text type="secondary">Status: </Text>
      <Text type="warning">{clearStatus}</Text>
    </Card>
  )
}

export default Storage
