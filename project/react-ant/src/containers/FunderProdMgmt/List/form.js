/**
 * created by Sherry Zhang on 2018-4-26
 */

import React from 'react';
import BaseFormContainer from 'ROOT_SOURCE/base/BaseFormContainer';
import {Form, Input, Button } from 'antd';
const FormItem = Form.Item;

export default class extends BaseFormContainer {

    render(){

        let { form, formData } = this.props;
        let { getFieldDecorator } = form;
        let { funderCode, funderName } = formData;

        return this.wrapItems(
           <div>
               <FormItem label={('资金方编号')}>
                   {getFieldDecorator('funderCode', {initialValue: funderCode||''})(<Input />)}
               </FormItem>

               <FormItem label={('资金方名称')}>
                   {getFieldDecorator('funderName', {initialValue: funderName||''})(<Input />)}
               </FormItem>
               <FormItem>
                   <Button type="primary" htmlType="submit"> 查询 </Button>
               </FormItem>
           </div>
       );
    }
}
