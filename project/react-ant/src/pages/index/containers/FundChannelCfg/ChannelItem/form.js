import React from 'react'
import {  Button, Form, Select } from 'antd'

import BaseContainer from 'ROOT_SOURCE/base/BaseContainer'

import {sleep} from 'ROOT_SOURCE/utils/index'
// import Rules from 'ROOT_SOURCE/utils/ValidateRules'
import request from 'ROOT_SOURCE/utils/request'

const FormItem = Form.Item
const Option = Select.Option


export default class extends BaseContainer {

    componentDidMount() {
        let itemId = this.props.match.params.id
        this.props.populateForm({ id: itemId })
    }
    submitForm = (e) => {
        e && e.preventDefault()

        const { form } = this.props

        form.validateFieldsAndScroll(async (err, values) => {
            if (err) {
                return;
            }

            // 提交表单最好新一个事务，不受其他事务影响
            await sleep(0)

            let _formData = { ...form.getFieldsValue() }

            // action
            await request.post('/assetFunderRel/updateConfigur', _formData)

            // 提交后返回list页
            this.props.history.push('/FundChannelCfg/list')
        })

        // 重置table
        this.props.resetTable && this.props.resetTable()

        // 提交表单最好新一个事务，不受其他事务影响
        setTimeout( () => {
            let _formData = { ...this.props.form.getFieldsValue() }

            // action-更新
            this.props.updateTable && this.props.updateTable(_formData)
        }, 0 )
    }

    constructor(props) {
        super(props);
        this.state = {
            assetNames: [],
            assetPrdNames:[],
            funderNames:[],
            funderPrdNames:[]
        };
    }

    getAssetDict= async () => {
        let res = await request.get('/asset/getAssetDict');
        if (typeof res === 'object' && res.data) {
            this.setState({assetNames: res.data});
        }
    }

    getAssetPrdDict = async (value) =>{
        let res = await request.get('/asset/getAssetPrdDict', {assetId:value});
        if(typeof res === 'object' && res.data){
                this.setState({
                    assetPrdNames: res.data
                });
        }
    }

    getFunderDict =async (value) => {
        let res = await request.get('/funder/getFunderDict');
        if (typeof res === 'object' && res.data) {
            this.setState({funderNames: res.data});
        }
    }

    getFunderPrdDict = async (value) => {
        let res = await request.get('/funder/getFunderPrdDict',{funderId:value});
        if (typeof res === 'object' && res.data) {
            this.setState({funderPrdNames: res.data});
        }
    }

    render() {

        let { form, formData } = this.props
        let { getFieldDecorator } = form

        const { assetName, assetPrdName,  funderName, funderPrdName } = formData
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        }


        return (<div className="ui-background">

            <Form layout="horizontal" style={{ maxWidth: '400px'}} onSubmit={this.submitForm}>

                <FormItem {...formItemLayout}label="资产方名称">
                    {getFieldDecorator('assetName', {
                    rules: [{ required: true }],
                    initialValue: assetName || ''
                    })(<Select placeholder="请选择资金方名称" onFocus={this.getAssetDict} onSelect={this.getAssetPrdDict}>
                        {this.state.assetNames.map((item) =>
                            <Option value={item.id} key={item.id}>{item.item}</Option>)}
                    </Select>)}
                </FormItem>

                <FormItem {...formItemLayout} label="资金方产品">
                    {getFieldDecorator('assetPrdName', {
                    rules: [{ required: true }],
                    initialValue: assetPrdName || ''
                    })(<Select placeholder="请选择资金方产品">
                        {this.state.assetPrdNames.map((item) =>
                            <Option value={item.id} key={item.id}>{item.item}</Option>)}
                        </Select>)}
                </FormItem>

                <FormItem {...formItemLayout} label="资金方名称">
                    {getFieldDecorator('funderName', {
                    rules: [{ required: true }],
                    initialValue: funderName || ''
                    })(<Select placeholder="请选择资金方名称" onFocus={this.getFunderDict} onSelect={this.getFunderPrdDict}>
                        {this.state.funderNames.map((item) =>
                            <Option value={item.id} key={item.id}>{item.item}</Option>)}
                        </Select>)}
                </FormItem>

                <FormItem {...formItemLayout} label="资金方产品" hasFeedback>
                    {getFieldDecorator('funderPrdName', {
                    rules: [{ required: true }],
                    initialValue: funderPrdName || ''
                    })(<Select placeholder="请选择资金方名称" >
                        {this.state.funderPrdNames.map((item) =>
                            <Option value={item.id} key={item.id}>{item.item}</Option>)}
                        </Select>)}

                </FormItem>

                <FormItem
                    wrapperCol={{
                        xs: { span: 24, offset: 0 },
                        sm: { span: 16, offset: 8 },
                    }}>
                    <Button type="primary" htmlType="submit"> 提交 </Button>
                </FormItem>
            </Form>
        </div>)

    }
}

