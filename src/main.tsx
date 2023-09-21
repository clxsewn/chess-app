import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.scss'
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/mdc-dark-indigo/theme.css'
import 'primeicons/primeicons.css'
import { PrimeReactProvider } from 'primereact/api'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <PrimeReactProvider>
                <App />
            </PrimeReactProvider>
        </Provider>
    </React.StrictMode>
)
