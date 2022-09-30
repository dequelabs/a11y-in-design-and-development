import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './containers/App'
import './index.css'
import '@deque/cauldron-styles/dist/index.css'

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App />)
