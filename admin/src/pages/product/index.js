import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import ProductList from './list.js'
import ProductSave from './save.js'
import ProductDetail from './detail.js'
class Product extends Component {
    render() {
        return (
            <div className='product'>
                <Switch>
                    <Route path='/product/save/:productId?' component={ProductSave} />
                    <Route path='/product/detail/:productId?' component={ProductDetail} />
                    <Route path='/product' component={ProductList} />
                </Switch>
            </div>
        )
    }
}
export default Product