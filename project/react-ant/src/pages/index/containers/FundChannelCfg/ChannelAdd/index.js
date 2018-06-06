import React, { Component } from 'react'
import { Form } from 'antd'


import combineContainer from 'ROOT_SOURCE/base/CompConjunction'

import F from './form'
import T from './table'

import * as actions from './actions'
import * as reducers from './reducers'



// let ListTable = combineContainer(T).withReducers(reducers).withActions(actions).val()
let ListForm = combineContainer(F).withReducers(reducers).withActions(actions).val()
ListForm = Form.create()(ListForm)


export default class extends Component {
    constructor (props) {
        super(props)
        this.state = {
            params: [],
        }
    }
    updateFormTable = (param) => {
        let arr = this.state.params.concat();
        let newParam = {
            assetId :param.assetName.key,
            assetName :param.assetName.label,
            assetPrdId :param.assetPrdName.key,
            assetPrdName :param.assetPrdName.label,
            funderId : param.funderName.key,
            funderName :param.funderName.label,
            funderPrdId : param.funderPrdName.key,
            funderPrdName :param.funderPrdName.label
        }
        arr.push(newParam);

        this.setState({params:arr})
    }
    updateTableAdd=(param)=>{
        this.setState({params:param})
    }
    render() {
        return (
        <section>
            <ListForm  updateFormTable={this.updateFormTable} />
            <T params={this.state.params} updateTableAdd={this.updateTableAdd} {...this.props}/>
        </section>
        )
    }
}
