import React, { useEffect } from 'react'
import appboxoSdk from '@appboxo/js-sdk'
import { Card, Button, Typography } from 'antd'
import { useObserver } from "mobx-react"
import LoggerContext from '../../LoggerContext'
import { StoreContext, TABS } from '../../StoreContext'

const { Text } = Typography;

const TAB_BADGES = [
  {
    tabId: 12,
    background: '#ff0000',
    color: '#ffffff',
    value: '4'
  },
  {
    tabId: 123,
    background: '#0000ff',
    color: '#ffffff',
    value: '12'
  },
  {
    tabId: 1234,
    background: '#00FF00',
    color: '#ffffff'
  }
]

const TabBar = () => {
  const { updateLogs } = React.useContext(LoggerContext)
  const store = React.useContext(StoreContext)

  const tabClickListener = (event) => {
    if (!event.detail) {
      return;
    }
  
    const { type, data } = event.detail;
  
    if (type === 'AppBoxoWebAppTabBarItemClick') {
      updateLogs({
        action: 'AppBoxoWebAppTabBarItemClick',
        message: 'received',
        data: data
      })

      if (data.tabId) {
        // Store active tab to preserve active tab value
        window.localStorage.setItem('activeTabId', data.tabId)

        const active = TABS.find(item => item.tabId === data.tabId)
        store.activeTabbarTabName = active.tabName

        // Remove badge preserving the other ones
        if (store.isTabbarBadgesShown && store.activeTabWithBadges.length) {
          const restBadges = store.activeTabWithBadges.filter(id => id !== data.tabId)
          store.activeTabWithBadges = restBadges

          appboxoSdk.send('AppBoxoWebAppSetTabBar', {
            badges: TAB_BADGES.filter(item => restBadges.includes(item.tabId))
          })
        }
      }
    }
  }

  useEffect(() => {
    appboxoSdk.subscribe(tabClickListener)

    return () => {
      appboxoSdk.unsubscribe(tabClickListener)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const initTabBar = () => {
    updateLogs({
      action: 'AppBoxoWebAppSetTabBar',
      message: 'called for three tabs'
    })

    const active = TABS.find(item => item.tabName === store.activeTabbarTabName)

    appboxoSdk.send('AppBoxoWebAppSetTabBar', {
      show: true,
      activeTab: active.tabId,
      list: TABS,
      options: {
        color: '#aaaaaa',
        background: '#ffffff',
        selectedColor: '#2eb8da',
        hasBorder: true,
        borderColor: '#cccccc'
      }
    })
    store.isTabbarInitialized = true
    store.isTabbarShown = true
  }

  const handleChangeToDark = () => {
    appboxoSdk.send('AppBoxoWebAppSetTabBar', {
      options: {
        color: '#ffffff',
        background: '#000000',
        selectedColor: '#2eb8da',
        hasBorder: true,
        borderColor: '#000000'
      }
    })

    store.isTabbarLightTheme = false
  }

  const handleChangeToLight = () => {
    appboxoSdk.send('AppBoxoWebAppSetTabBar', {
      options: {
        color: '#aaaaaa',
        background: '#ffffff',
        selectedColor: '#2eb8da',
        hasBorder: true,
        borderColor: '#cccccc'
      }
    })

    store.isTabbarLightTheme = true
  }

  const handleVisibility = (show) => {
    appboxoSdk.send('AppBoxoWebAppSetTabBar', {
      show
    })

    store.isTabbarShown = show
  }

  const handleShowTabItemBadges = () => {
    appboxoSdk.send('AppBoxoWebAppSetTabBar', {
      badges: TAB_BADGES
    })

    store.activeTabWithBadges = TABS.map(item => item.tabId)
    store.isTabbarBadgesShown = true
  }

  return useObserver(() => (
    <Card
      title="TabBar"
    >
      {!store.isTabbarInitialized ? (
        <Button
          className="wrap-button"
          size="large"
          block
          onClick={initTabBar}
        >Initialize native bottom tab bar</Button>
      ) : !store.isTabbarShown ? (
        <Button
          size="large"
          block
          onClick={() => handleVisibility(true)}
        >Show tab bar</Button>
      ) : (
        <>
          <Button
            size="large"
            block
            onClick={() => handleVisibility(false)}
          >Hide tab bar</Button>
          {store.isTabbarLightTheme ? (
            <Button
              size="large"
              block
              onClick={handleChangeToDark}
            >Change to dark theme</Button>
          ) : (
            <Button
              size="large"
              block
              onClick={handleChangeToLight}
            >Change to light theme</Button>
          )}
          <Button
            size="large"
            block
            onClick={handleShowTabItemBadges}
          >Show tab item badges</Button>
          {store.isTabbarShown && (
            <>
              <Text type="secondary">Active tab name: </Text>
              <Text type="warning">{store.activeTabbarTabName || 'Home'}</Text>
            </>
          )}
        </>
      )}
    </Card>
  ))
}

export default TabBar
