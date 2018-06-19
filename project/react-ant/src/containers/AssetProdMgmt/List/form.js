import React from 'react'
import { Input, Button, Form } from 'antd'

import BaseFormContainer from 'ROOT_SOURCE/base/BaseFormContainer'
// import { formatDate, disablePickerDate } from 'ROOT_SOURCE/utils/fieldFormatter'

const FormItem = Form.Item

export default class extends BaseFormContainer {
    // 配置
    render() {
        let { form, formData } = this.props
        let { getFieldDecorator } = form
        let { assetCode, assetName, assetPrdName } = formData

        return this.wrapItems(<div>
            <FormItem label={('资产方编号')}>
                {getFieldDecorator('assetCode', {initialValue: assetCode||''})(<Input />)}
            </FormItem>

            <FormItem label={('资产方名称')}>
                {getFieldDecorator('assetName', {initialValue: assetName||''})(<Input />)}
            </FormItem>

            <FormItem label={('产品名称')}>
                {getFieldDecorator('assetPrdName', {initialValue: assetPrdName||''})(<Input />)}
            </FormItem>

            <FormItem>
                <Button type="primary" htmlType="submit"> 查询 </Button>
            </FormItem>
        </div>)
    }
}