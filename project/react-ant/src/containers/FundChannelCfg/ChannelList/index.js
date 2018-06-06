import React, { Component } from 'react'
import { Button,Form } from 'antd'
import { Link} from 'react-router-dom'


import combineContainer from 'ROOT_SOURCE/base/CompConjunction'

import F from './form'
import T from './table'

import * as actions from './actions'
import * as reducers from './reducers'



let ListTable = combineContainer(T).withReducers(reducers).withActions(actions).val()
let ListForm = combineContainer(F).withReducers(reducers).withActions(actions).val()
ListForm = Form.create()(ListForm)


export default class extends Component {
    // constructor (props) {
    //     super(props)
    // }
    render() {
        return (
            <section>
                < div style={{ marginTop:20}} > 
                <Link to = '/FundChannelCfg/add' >
                    <Button type="primary" >配置资金通道</Button>           
                </Link>          
                </div>
                <ListForm />
                <ListTable {...this.props}/>
            </section>
        )
    }
}
