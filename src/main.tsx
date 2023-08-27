import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primeicons/primeicons.css'
import { PrimeReactProvider } from 'primereact/api'
import { Provider } from 'react-redux'
import { store } from './store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <PrimeReactProvider>
                <App />
            </PrimeReactProvider>
        </Provider>
    </React.StrictMode>
)
