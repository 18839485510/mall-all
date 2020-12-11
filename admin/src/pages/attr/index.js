import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import AttrList from './list.js'
import AttrSave from './save.js'
class Attr extends Component {
    render() {
        return (
            <div className='attr'>
                <Switch>
                    <Route path='/attr/save/:attrId?' component={AttrSave} />
                    <Route path='/attr' component={AttrList} />
                </Switch>
            </div>
        )
    }
}
export default Attr