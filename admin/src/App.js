import React, { Component } from 'react'
import { Button } from 'antd'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Login from 'pages/login'
import Home from 'pages/home'
import { getUsername } from 'utils'

import './app.css'

class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const ProtectRoute = ({ component: Component, ...rest }) => <Route {...rest} render={() => getUsername() ? <Component /> : <Redirect to='/login' />} />
    const LoginRoute = ({ component: Component, ...rest }) => <Route {...rest} render={() => getUsername() ? <Redirect to='/' /> : <Component />} />
    return (
      <div className='App'>
        <Router>
          <Switch>
            <ProtectRoute exact={true} path='/' component={Home} />
            <LoginRoute path='/login' component={Login} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App