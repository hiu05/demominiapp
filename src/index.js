import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import appboxoSdk from '@appboxo/js-sdk'

appboxoSdk.sendPromise('AppBoxoWebAppGetMiniappSettings').then(data => {
  console.log('MINIAPP_SETTINGS: ', data)
  document.head.insertAdjacentHTML('beforeend', `<style>
    :root {
      --primary-color: ${data.miniapp_settings.colors.primary_color};
      --secondary-color: ${data.miniapp_settings.colors.secondary_color};
      --tertiary-color: ${data.miniapp_settings.colors.tertiary_color};
    }
  </style>`)
}).catch(err => console.log(err));

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
