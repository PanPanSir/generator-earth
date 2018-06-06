import React from 'react'
import { Form } from 'antd'

import combineContainer from  'ROOT_SOURCE/base/CompConjunction'

import F from './form'

import * as actions from './actions'
import * as reducers from './reducers'


let ItemForm = combineContainer(F).withReducers(reducers).withActions(actions).val()
ItemForm = Form.create()(ItemForm)


export default (props) => {
    return (
        <ItemForm {...props} />
    )
}
