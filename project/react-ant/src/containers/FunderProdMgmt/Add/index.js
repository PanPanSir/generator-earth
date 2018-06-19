/**
 * created by Sherry Zhang on 2018-4-26
 */

import React from 'react'
import { Form, Button, Input, Select } from 'antd'
import BaseFormContainer from "ROOT_SOURCE/base/BaseFormContainer";
import request from 'ROOT_SOURCE/utils/request'
import { sleep } from 'ROOT_SOURCE/utils/index'
import * as actions from './actions';
import * as reducers from './reducers';
import combineContainer from  'ROOT_SOURCE/base/CompConjunction'

const FormItem = Form.Item;
const Option = Select.Option;


const PAY_METHOD_MAP = [
    {
        "id": "1",
        "item": "到期还本付息"
    }, {
        "id": "2",
        "item": "等额本息"
    }, {
        "id": "3",
        "item": "等额本金"
    }, {
        "id": "4",
        "item": "按月付息，到期还本"
    }
];

class addForm extends BaseFormContainer {
    componentDidMount(){
        if(this.props.funderNames.length === 0) {
            //拉取下拉列表的数据
            this.props.getFunderNames && this.props.getFunderNames();
        }
    }

    submitForm = (e) => {

        e && e.preventDefault();

        const { form } = this.props;

        form.validateFieldsAndScroll(async (err, values) => {
            if (err) {
                return;
            }

            // 提交表单最好新一个事务，不受其他事务影响
            await sleep(0)

            let _formData = { ...form.getFieldsValue() }

            // action
            await request.post('/funder/addFunderPrd', _formData)

            // 提交后返回list页
            this.props.history.push('/FunderProdMgmt/list')
        })
    };

    render(){
        let { getFieldDecorator } = this.props.form;

        return(
            this.wrapItems(
                <div>
                    <FormItem label={('资金方名称')}>
                        {
                            getFieldDecorator('funderName',{
                                rules: [{ required: true }]
                            })(
                                <Select style={{ width: 160 }}>
                                    {this.props.funderNames.map( obj =>
                                        <Option value={obj.id} key={obj.id}>{obj.item}</Option>
                                    )}
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem label={('资金方产品')}>
                        {getFieldDecorator('funderPrd', {
                            rules: [{ required: true }]
                        })(<Input />)}
                    </FormItem>
                    <FormItem label={('单笔放款限额')}>
                        {getFieldDecorator('singleLimit')(<Input />)}
                    </FormItem>
                    <FormItem label={('日限额')}>
                        {getFieldDecorator('dateLimit')(<Input />)}
                    </FormItem>
                    <FormItem label={('资金产品额度')}>
                        {getFieldDecorator('funderLimit')(<Input />)}
                    </FormItem>
                    <FormItem label={('费率')}>
                        {getFieldDecorator('rate', {
                            rules: [{ required: true }]
                        })(<Input />)}
                    </FormItem>
                    <FormItem label={('还款方式')}>
                        {
                            getFieldDecorator('payMtd',{
                                rules: [{ required: true }]
                            })(
                                <Select style={{ width: 160 }}>
                                    {PAY_METHOD_MAP.map( obj =>
                                        <Option value={obj.id} key={obj.id}>{obj.item}</Option>
                                    )}
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem label={('备注')}>
                        {getFieldDecorator('remarks')(<Input />)}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit"> 提交 </Button>
                    </FormItem>
                </div>
            )
        );
    }
}

let connectedAddForm = combineContainer(addForm).withReducers(reducers).withActions(actions).val();

export default Form.create()(connectedAddForm);