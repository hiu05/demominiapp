import React from 'react'
import { useLocalStore } from "mobx-react"

export const StoreContext = React.createContext()

export const TABS = [
  {
    tabId: 12,
    tabName: 'Home',
    tabIcon: `${document.location.origin}/img/home-icon.png`
  },
  {
    tabId: 123,
    tabName: 'About',
    tabIcon: `${document.location.origin}/img/info-icon.png`
  },
  {
    tabId: 1234,
    tabName: 'Services',
    tabIcon: `${document.location.origin}/img/service-icon.png`
  }
]

const StoreProvider = ({ children }) => {
  const activeTabId = window.localStorage.getItem('activeTabId')
  let activeTabName = TABS[0].tabName

  if (activeTabId) {
    const activeTab = TABS.find(tab => tab.tabId === parseInt(activeTabId))
    if (activeTab) {
      activeTabName = activeTab.tabName
    }
  }

  const store = useLocalStore(() => ({
    isTabbarInitialized: false,
    isTabbarShown: false,
    isTabbarLightTheme: true,
    activeTabbarTabName: activeTabName,
    isTabbarBadgesShown: false,
    activeTabWithBadges: TABS.map(item => item.tabId),
    isLightActionButtons: false
  }))

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  )
}

export default StoreProvider
