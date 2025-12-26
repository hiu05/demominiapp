import React from 'react'
import { useHistory } from 'react-router-dom'
import LoggerContext from '../LoggerContext.js'

import { Button } from 'antd'

import './Home.scss'

const Home = (props) => {
  const { updateLogs } = React.useContext(LoggerContext)
  let history = useHistory();

  const handleAccountClick = () => {
    updateLogs({
      action: 'REDIRECT',
      message: 'to account details'
    })
    history.push('/account');
  }

  const handleFeaturesClick = () => {
    updateLogs({
      action: 'REDIRECT',
      message: 'to features details'
    })
    history.push('/features');
  }

  return (
    <section className="pane intro">
      <div>
        <h1>Appboxo <br/> Connect API demo</h1>
        <p>This demo shows Appboxo Connect API capabilities to pass login credentials from host app to miniapp.</p>
        <p>Tap on account details button to login in the miniapp with credentials from Appboxo demo app.</p>
      </div>
      <div>
        <Button
          type="primary"
          size="large"
          onClick={handleAccountClick}
          block
        >Account details</Button>
        <Button
          size="large"
          block
          onClick={handleFeaturesClick}
        >Features</Button>
      </div>
    </section>
  )
}

export default Home
