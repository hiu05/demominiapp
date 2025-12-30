import React, { useEffect, useState } from 'react'

import appboxoSdk from '@appboxo/js-sdk'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { Button } from 'antd';

import Account from './Account/Account'
import Features from './Features/Features'
import Home from './Home/Home'
import AuthContext from './AuthContext'
import LoggerContext from './LoggerContext'
import Logs from './components/Logs'
import StoreProvider from './StoreContext'

function App() {
  const [loginStatus, setLoginStatus] = useState(false)
  const [logsVisibility, setLogsVisibility] = useState(false)
  const [logs, setLogs] = useState([])

  const updateLogs = (newLog) => {
    setLogs([...logs, newLog])
  }

  useEffect(() => {
    console.log('Getting data')
    // Get initial app data
   const initApp = async () => {
    try {
      // Wait for getInitData to complete first
      const appData = await appboxoSdk.getInitData();
      console.log('AppData: ', appData);
      setLoginStatus(Boolean(appData.token));
      
      localStorage.clear();
      localStorage.setItem('app_id', appData.app_id);
      localStorage.setItem('client_id', appData.client_id);

      // Now you can safely use other SDK methods
      appboxoSdk.send('AppBoxoWebAppSetStatusBarColor', {
        color: '#ffffff'
      });
    } catch (error) {
      console.log('Error getting web app init data: ', error);
    }
  };

  initApp();

    // Set status bar color
    appboxoSdk.send('AppBoxoWebAppSetStatusBarColor', {
      color: '#ffffff'
    })

    const currentLogs = [
      {
        action: 'AppBoxoWebAppSetStatusBarColor',
        message: 'request sent'
      },
      {
        action: 'AppBoxoWebAppGetInitData',
        message: 'request sent'
      }
    ]
    setLogs([...logs, ...currentLogs])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AuthContext.Provider value={{
      loginStatus,
      setLoginStatus
    }}>
      {!logsVisibility && (
        <Button
          type="dashed"
          size="small"
          className="show-logs-button"
          onClick={() => setLogsVisibility(true)}
        >Show Logs</Button>
      )}
      <LoggerContext.Provider value={{
        updateLogs
      }}>
        <StoreProvider>
          <Router>
            <Switch>
              <Route path="/account">
                <Account />
              </Route>
              <Route path="/features">
                <Features />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Router>
        </StoreProvider>
      </LoggerContext.Provider>
      {logsVisibility && <Logs logs={logs} onClose={() => setLogsVisibility(false)}/>}
    </AuthContext.Provider>
  );
}

export default App;
