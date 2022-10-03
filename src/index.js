import React from 'react'
import { render } from 'react-dom'
import App from './containers/App'
import './index.css'
import '@deque/cauldron-styles/dist/index.css'

const container = document.getElementById('root')

render(<App />, container)
