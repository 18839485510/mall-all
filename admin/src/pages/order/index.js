import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import OrderList from './list.js'
import OrderDetail from './detail.js'
class Order extends Component {
    render() {
        return (
            <div className='order'>
                <Switch>
                    <Route path='/order/detail/:OrderId?' component={OrderDetail} />
                    <Route path='/order' component={OrderList} />
                </Switch>
            </div>
        )
    }
}
export default Order