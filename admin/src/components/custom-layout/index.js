import React, { Component } from 'react'
import { Layout } from 'antd';

import CustomHeader from 'components/custom-header'
import CustomSider from 'components/custom-sider'

export default class CustomLayout extends Component {
    render() {
        return (
            <div className='custom-layout'>
                <Layout>
                    <CustomHeader />
                    <Layout>
                        <CustomSider />
                        <Layout style={{ padding: '0 24px 24px' }}>
                            {this.props.children}
                        </Layout>
                    </Layout>
                </Layout>
            </div>
        )
    }
}