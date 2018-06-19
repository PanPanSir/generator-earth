import React, { Component } from 'react'
import { Button,Form } from 'antd'
import { Link} from 'react-router-dom'


import combineContainer from 'ROOT_SOURCE/base/CompConjunction'

import F from './form'

import * as actions from './actions'
import * as reducers from './reducers'


let ListForm = combineContainer(F).withReducers(reducers).withActions(actions).val()
ListForm = Form.create()(ListForm)


export default (props) =>{ 
    return (
        <section>
            <ListForm {...props}/>
        </section>
    )
  
}
