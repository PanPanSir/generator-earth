import React from 'react'
import { Input, Button, Form, Select } from 'antd'
import BaseFormContainer from 'ROOT_SOURCE/base/BaseFormContainer'

const FormItem = Form.Item
const Option = Select.Option


export default class extends BaseFormContainer {
    
    /**
     * this.props.formData里的一些值需要适配
     */
    
    submitForm = (e) => {
        e && e.preventDefault()
        
        // 重置table
        this.props.resetTable && this.props.resetTable()
        
        // 提交表单最好新一个事务，不受其他事务影响
        setTimeout( () => {
            let _formData = { ...this.props.form.getFieldsValue() }
            
            // action-更新
            this.props.updateTable && this.props.updateTable(_formData)
        }, 0 )
    }

    handlerJumpItem = () => {
        this.props.history.pushState(null, '/item')
    }

    render() {
        let { form, formData } = this.props
        let { getFieldDecorator } = form
        let { assetCode, assetName, contract} = formData
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
        
        return ( <div className="ui-background" >
            <Form layout="horizontal" style={{ maxWidth: '400px' }} onSubmit={this.submitForm}>
            
                <FormItem {...formItemLayout} label={('资产方编号')}>
                {getFieldDecorator('assetCode', { initialValue: assetCode || '' })(<Input placeholder="请输入资产方编号"/>)}
                </FormItem>

                <FormItem {...formItemLayout} label={('资产方名称')}>
                {getFieldDecorator('assetName', { initialValue: assetName || '' })(<Input placeholder="请输入资产方名称"/>)}
                </FormItem>

                <FormItem {...formItemLayout} label={('资金方编号')}>
                {getFieldDecorator('contract', { initialValue: contract || '' })(<Input placeholder="请输入资金方编号"/>)}
                </FormItem>
                
                
                <FormItem {...formItemLayout} label={('资金方名称')}>
                {getFieldDecorator('contract', { initialValue: contract || '' })(<Input placeholder="请输入资金方名称"/>)}
                </FormItem>
                
                
                <FormItem 
                wrapperCol={{
                    xs: { span: 24, offset: 0 },
                    sm: { span: 16, offset: 8 },
                }}>
                    <Button type="primary" htmlType="submit"> 查询 </Button>
                </FormItem>
            </Form> 
        </div>)
    }
}

