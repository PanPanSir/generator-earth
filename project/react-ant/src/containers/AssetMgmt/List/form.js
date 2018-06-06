import moment from 'moment'
import React from 'react'
import { Input, DatePicker, Button, Form, Select } from 'antd'

import BaseFormContainer from 'ROOT_SOURCE/base/BaseFormContainer'

import { mapMoment } from 'ROOT_SOURCE/utils/FieldFormatter'
import DateRangePicker from 'ROOT_SOURCE/components_common/DateRangePicker'


const { MonthPicker, RangePicker } = DatePicker
const FormItem = Form.Item
const Option = Select.Option


export default class extends BaseFormContainer {
    
    /**
     * this.props.formData里的一些值需要适配
     */
    adaptFormData(formData) {
        return mapMoment(formData, 'YYYY-MM-DD HH:mm:ss')
    }
    
    
    
    render() {
        let { form, formData } = this.props
        let { getFieldDecorator } = form
        let { assetCode, assetName, contract, startDate, endDate } = formData
        
        
        return this.wrapItems(<div>
           
            <FormItem label={('资产方编号')}>
                {getFieldDecorator('assetCode', {initialValue: assetCode||''})(<Input />)}
            </FormItem>

            <FormItem label={('资产方名称')}>
                {getFieldDecorator('assetName', {initialValue: assetName||''})(<Input />)}
            </FormItem>

            <FormItem label={('签约主体')}>
                {getFieldDecorator('contract', {initialValue: contract||''})(<Input />)}
            </FormItem>
            
            
            <FormItem label={('签约时间')}>
                <DateRangePicker
                    dateShowFormat='YYYY年MM月DD HH:mm:ss'
                    form={form}
                    startVal={startDate}
                    startKey='startDate'
                    endVal={endDate}
                    endKey='endDate'
                />
            </FormItem>
            
            
            <FormItem>
                <Button type="primary" htmlType="submit"> 查询 </Button>
            </FormItem>
            
        </div>)
    }
}

