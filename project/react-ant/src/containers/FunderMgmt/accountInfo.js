import React from 'react';
import {Form, Input} from 'antd';
import rules from 'ROOT_SOURCE/utils/validateRules'


const FormItem = Form.Item;

const AccountInfo = props => {

    const {form, type, bankCardList, handleDeleteItem} = props;

    const renderMap = bankCardList && bankCardList.map((item, i) => (
        <div className="form-item-inline" key={item.key}>

            <FormItem colon={false} label={(<span>开户账户</span>)} hasFeedback style={{marginRight: 34}}>
                {form.getFieldDecorator(`accountNumber-${item.key}`, {
                    rules: [
                        {pattern: rules.bankCard, message: '请输入正确的银行卡号'},
                    ],
                    initialValue: item.accountNumber || ''
                })(<Input placeholder="请输入开户账户" maxLength='20' minLength='14' style={{width: 200}}
                          disabled={type === "review"}/>)}
            </FormItem>

            <FormItem colon={false} label={(<span>开户描述</span>)} style={{marginRight: 20}} hasFeedback>
                {form.getFieldDecorator(`accountDescription-${item.key}`, {
                    initialValue: item.accountDescription || ''
                })(<Input placeholder="20文字之内，非必填" style={{width: 300}} maxLength='20'
                          disabled={type === "review"}/>)}
            </FormItem>

            <FormItem
                style={{
                    width:'50',
                    color: "red",
                    backgroundColor: "#fff",
                    border: 'none',
                    opacity: ((bankCardList.length === 1 && i === 0) ? 0 : 1),
                    display: type === 'review' ? "none" : "block"
                }}
            ><a onClick={(e) => {
                if (bankCardList.length === 1 && i === 0) {
                    return false
                } else {
                    handleDeleteItem(e, item.key)
                }
            }}>删除</a></FormItem>

        </div>
    ));

    return <div>{renderMap}</div>
};

export default AccountInfo;