import React, { useCallback, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import App from './App'
import ToastContainer from './components/ui/ToastContainer'
import SitePreloader from './components/ui/SitePreloader'
import ScrollToTop from './components/layout/ScrollToTop'
import './index.css'

function Root() {
  const [loading, setLoading] = useState(true)
  const finishLoading = useCallback(() => setLoading(false), [])

  return (
    <BrowserRouter>
      <AnimatePresence>
        {loading && <SitePreloader key="site-preloader" onDone={finishLoading} />}
      </AnimatePresence>
      {!loading && (
        <>
          <ScrollToTop />
          <App />
          <ToastContainer />
        </>
      )}
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root />)
