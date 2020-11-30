import React, { Component } from 'react'
import {Button} from 'antd'
import Login from '../src/pages/login'

import './app.css'

class Index extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className='login'>
        <Login />
      </div>
    )
  }
}
class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className='App'>
        <Index />
      </div>
    )
  }
}

export default App