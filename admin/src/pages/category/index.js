import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import CategoryList from './list.js'
import CategorySave from './save.js'
class Category extends Component {
    render() {
        return (
            <div className='categorys'>
                <Switch>
                    <Route path='/category/save/:categoryId?' component={CategorySave} />
                    <Route path='/category' component={CategoryList} />
                </Switch>
            </div>
        )
    }
}
export default Category