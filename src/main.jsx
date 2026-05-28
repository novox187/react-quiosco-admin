import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import './index.css'
import { GeneralProvider } from './context/GeneralProvider'
import { HeroUIProvider } from '@heroui/react'
import 'leaflet/dist/leaflet.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <GeneralProvider>
        <HeroUIProvider>
            <RouterProvider router={router} />
        </HeroUIProvider>
    </GeneralProvider>
)
