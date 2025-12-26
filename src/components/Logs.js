import React from 'react'
import { Button } from 'antd';

import './Logs.scss'

const Logs = ({ onClose, logs }) => {
  return (
    <section className="logs">
      <Button
        type="dashed"
        size="small"
        className="show-logs-button"
         onClick={onClose}
      >Hide Logs</Button>
      <ul>
        {logs.map(log => (<li key={log.action + '-' + log.message}>
          {log.action}: {log.message} <br/>
          {JSON.stringify(log.data)}
        </li>))}
      </ul>
    </section>
  )
}

export default Logs
