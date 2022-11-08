import React from 'react'
import ReactDOM from 'react-dom/client'
// import * as Sentry from '@sentry/browser'
// import ReactGA from 'react-ga'
import { App } from './app/App.controller'
import reportWebVitals from './reportWebVitals'
import { unregister } from './serviceWorker'
import { GlobalStyle } from './styles'

import './styles/fonts.css'

// Sentry.init({ dsn: 'XXX' })
// ReactGA.initialize('XXX')

export const Root = () => {
  const GlobalStyleProxy: any = GlobalStyle

  return (
    <>
      <GlobalStyleProxy />
      <App />
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)

unregister()
reportWebVitals()
