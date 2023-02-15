import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { CssBaseline } from '@mui/material'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { persistor, store } from './store'

const root = createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <StrictMode>
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
              <App />
              <CssBaseline />
          </PersistGate>
      </Provider>
  </StrictMode>
)

reportWebVitals()
