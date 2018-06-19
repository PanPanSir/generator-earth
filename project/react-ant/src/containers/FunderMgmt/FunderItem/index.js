import React from 'react'
import { Form } from 'antd'


import combineContainer from 'ROOT_SOURCE/base/CompConjunction'

import F from './form'

import * as actions from './actions'
import * as reducers from './reducers'
import * as reducers_list from '../FunderList/reducers'


let ListForm = combineContainer(F)
                .withReducers(reducers)
                .withReducers(reducers_list)
                .withActions(actions).val()
ListForm = Form.create()(ListForm)


export default (props) =>{ 
    
    return (
        <section>
            <ListForm {...props}/>
        </section>
    )
  
}
