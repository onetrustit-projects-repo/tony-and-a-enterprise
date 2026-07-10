import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SiteContentProvider } from './content/SiteContentContext.jsx'

window.addEventListener('error', (event) => {
  const target = event.target

  if (!(target instanceof HTMLImageElement)) {
    return
  }

  if (!/\/uploads\//.test(target.src) || target.dataset.cacheRetried === 'true') {
    return
  }

  const retryUrl = new URL(target.src, window.location.origin)
  retryUrl.searchParams.set('cb', Date.now().toString())
  target.dataset.cacheRetried = 'true'
  target.src = retryUrl.toString()
}, true)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SiteContentProvider>
      <App />
    </SiteContentProvider>
  </React.StrictMode>,
)
