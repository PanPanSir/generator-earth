import React, { Component } from 'react'
import { Form, Button } from 'antd'
import { Link } from 'react-router-dom'

import combineContainer from  'ROOT_SOURCE/base/CompConjunction'

import F from './form'
import T from './table'

import * as actions from './actions'
import * as reducers from './reducers'



let ListTable = combineContainer(T).withReducers(reducers).withActions(actions).val()
let ListForm = combineContainer(F).withReducers(reducers).withActions(actions).val()
ListForm = Form.create()(ListForm)


export default (props) => {
    return (
        <section>
            <Link to="/AssetMgmt/add">
                <Button type="primary" style={{marginTop: '12px'}}>新增</Button>
            </Link>
            <ListForm />
            <ListTable />
        </section>
    )
}