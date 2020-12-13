import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import AdList from './list.js'
import AdSave from './save.js'
class Ad extends Component {
    render() {
        return (
            <div className='ads'>
                <Switch>
                    <Route path='/ad/save/:adId?' component={AdSave} />
                    <Route path='/ad' component={AdList} />
                </Switch>
            </div>
        )
    }
}
export default Ad