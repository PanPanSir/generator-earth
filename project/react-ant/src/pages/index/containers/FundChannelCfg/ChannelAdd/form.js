import React from 'react'
import {  Button, Form,Select } from 'antd'

import BaseContainer from 'ROOT_SOURCE/base/BaseContainer'

// import Rules from 'ROOT_SOURCE/utils/ValidateRules'
import request from 'ROOT_SOURCE/utils/request'

const FormItem = Form.Item
const Option = Select.Option

export default Form.create()(class extends BaseContainer {
    submitForm = (e) => {
        e && e.preventDefault()

        const { form } = this.props

        form.validateFieldsAndScroll(async (err, values) => {
            if (err) {
                return;
            }
        let _formData = { ...form.getFieldsValue() }
        // 数据更新
        this.props.updateFormTable && this.props.updateFormTable(_formData)
        // 清空form数据
        this.props.form.resetFields()

        })
    }
    constructor(props) {
        super(props);
        this.state = {
            assetNames: [],
            assetPrdNames:[],
            funderNames:[],
            funderPrdNames:[]
        }
    }
    componentDidMount= async () => {
        let res = await request.get('/asset/getAssetDict');
        if(typeof res === 'object' && res.data){
            this.setState({
                assetNames: res.data
            });
        }
    }

    getAssetPrdDict = async (value) => {
        let res = await request.get('/asset/getAssetPrdDict', {assetId:value});
        if(typeof res === 'object' && res.data){
            this.setState({
                assetPrdNames: res.data
            });
        }
    }

    getFunderDict = async(value) => {
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
        let { form } = this.props
        let { getFieldDecorator } = form
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
                    })(<Select placeholder="请选择资金方名称"
                        labelInValue={true}
                        onSelect={this.getAssetPrdDict}>
                        {this.state.assetNames.map((item) =>
                            <Option value={item.id} key={item.id}>{item.item}</Option>)}
                </Select>)}
                </FormItem>

                <FormItem {...formItemLayout} label="资金方产品">
                    {getFieldDecorator('assetPrdName', {
                        rules: [{ required: true }],
                    })(<Select placeholder="请选择资金方产品" labelInValue={true}>
                        {this.state.assetPrdNames.map((item) =>
                            <Option value={item.id} key={item.id}>{item.item}</Option>)}
                    </Select>)}
                </FormItem>

                <FormItem {...formItemLayout} label="资金方名称">
                    {getFieldDecorator('funderName', {
                        rules: [{ required: true }],
                    })(<Select placeholder="请选择资金方名称"
                        labelInValue={true}
                        onFocus={this.getFunderDict}
                        onSelect={this.getFunderPrdDict}>
                        {this.state.funderNames.map((item) =>
                            <Option value={item.id} key={item.id}>{item.item}</Option>)}
                    </Select>)}
                </FormItem>

                <FormItem {...formItemLayout} label="资金方产品" hasFeedback>
                    {getFieldDecorator('funderPrdName', {
                        rules: [{ required: true }],
                    })(<Select placeholder="请选择资金方名称" labelInValue={true}>
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
})

