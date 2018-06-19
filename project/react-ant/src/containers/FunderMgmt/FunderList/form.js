import BaseFormContainer from 'ROOT_SOURCE/base/BaseFormContainer'
import {mapMoment} from 'ROOT_SOURCE/utils/fieldFormatter'
import {Form, Input, Button} from 'antd'
import React from 'react'
import DateRangePicker from 'ROOT_SOURCE/components/DateRangePicker'

// const {MonthPicker, RangePicker} = DatePicker
const FormItem = Form.Item

export default class extends BaseFormContainer {
   /**
     * this.props.formData里的一些值需要适配
     */
    adaptFormData(formData) {
        return mapMoment(formData, 'YYYY-MM-DD HH:mm:ss')
    }

    render(){
        let { form, formData } = this.props      
        let { getFieldDecorator } = form
        let { funderCode, funderName, contract, startDate, endDate } = formData
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
            
                <FormItem {...formItemLayout} label={('资金方编号')}>
                {getFieldDecorator('funderCode', { initialValue: funderCode || '' })(<Input placeholder="请输入资金方编号"/>)}
                </FormItem>

                <FormItem {...formItemLayout} label={('资金方名称')}>
                {getFieldDecorator('funderName', { initialValue: funderName || '' })(<Input placeholder="请输入资金方名称"/>)}
                </FormItem>

                <FormItem {...formItemLayout} label={('签约主体')}>
                {getFieldDecorator('contract', { initialValue: contract || '' })(<Input placeholder="请输入签约主体"/>)}
                </FormItem>
                
                
                <FormItem {...formItemLayout} label={('签约时间')}>
                    <DateRangePicker
                        dateShowFormat='YYYY年MM月DD HH:mm:ss'
                        form={form}
                        startVal={startDate}
                        startKey='startDate'
                        endVal={endDate}
                        endKey='endDate'/>
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