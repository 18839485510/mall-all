import React, { Component } from 'react'

import { Link } from 'react-router-dom'
class CategoryList extends Component {
    render() {
        return (
            <div className='category-list'>
                <Link to='/category/save'>新增</Link>
                this is category list page
            </div>
        )
    }
}
export default CategoryList