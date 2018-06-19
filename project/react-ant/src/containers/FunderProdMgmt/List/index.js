/**
 * created by Sherry Zhang on 2018-4-26
 */

import React, { Component } from 'react'
import { Form, Button } from 'antd'
import { Link } from 'react-router-dom'
import combineContainer from  'ROOT_SOURCE/base/CompConjunction'

import F from './form';
import T from './table';

import * as actions from './actions';
import * as reducers from './reducers';

let ListTable = combineContainer(T).withReducers(reducers).withActions(actions).val();
let SearchForm = combineContainer(F).withReducers(reducers).withActions(actions).val();
SearchForm = Form.create()(SearchForm);

export default class extends Component {
    render(){
        return(
            <section>
                <Link to="/FunderProdMgmt/add">
                    <Button type="primary" style={{marginTop: '12px'}}>新增资金方产品</Button>
                </Link>
                <SearchForm />
                <ListTable />
            </section>
        );
    }
}