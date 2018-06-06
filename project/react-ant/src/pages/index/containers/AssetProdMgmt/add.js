import moment from 'moment'
import React from 'react'
import { DatePicker, Button, Form, Input, Select, Row, Col, message } from 'antd'

import BaseContainer from 'ROOT_SOURCE/base/BaseContainer'

import { sleep } from 'ROOT_SOURCE/utils/index'
import { mapMoment } from 'ROOT_SOURCE/utils/FieldFormatter'
import Rules from 'ROOT_SOURCE/utils/ValidateRules'
import request from 'ROOT_SOURCE/utils/request'

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

const toNumber = v => {
    const val = v.trim();
    if (val) {
        return val - 0;
    }
};


export default Form.create()( class extends BaseContainer {
    constructor(props){
        super(props);
        this.state = {
            assetNames: []
        }
    }

    async componentDidMount(){
        let res = await request.get('/asset/getAssetDict');
        if(typeof res === 'object' && res.data){
            this.setState({
                assetNames: res.data
            });
        } 
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

            const { singleLimit, dateLimit, totalLimit } = values;
            const balance1 = dateLimit - singleLimit;
            const balance2 = totalLimit - dateLimit;
            const balance3 = totalLimit - singleLimit;

            if (balance1 >= 0 && balance2 >= 0 && balance3 >= 0) {
                // action
                await request.post('/asset/addAssetPrd', _formData)
                // 提交后返回list页
                this.props.history.push('/AssetProdMgmt/list')

            } else if (balance1 < 0) {
                message.error('单笔限额不得大于日限额', 5);
            } else if (balance2 < 0) {
                message.error('日限额不得大于总额度', 5);
            }          
            
        })
    }
    
    handleNumberFormat = (e) => {
        const { value, id } = e.target;
        const { form } = this.props;
        // 验证是否有值
        if (!`${value}`) return;
        // 验证是否为有效值
        form.validateFields([id], (err, values) => {
            if (!err) {
                form.setFieldsValue({
                    [id]: Number(value).toFixed(2)
                });
            }
        });
    }
    
    
    render() {
        
        let { form } = this.props
        let { getFieldDecorator } = form
        
        
        return (
            <div className="ui-background">
                <Form layout="inline" onSubmit={this.submitForm}>
                
                <FormItem label="资产方名称" hasFeedback>
                        {getFieldDecorator('assetId', {
                            rules: [{ required: true, message: '请选择资产方名称' }]
                        })(<Select style={{width: 180}}>
                            {this.state.assetNames.map((item) => <Option value={item.id} key={item.id}>{item.item}</Option>)}
                        </Select>)}
                    </FormItem>
        
                    <FormItem label="资产方产品" hasFeedback>
                        {getFieldDecorator('assetPrdName', {
                            rules: [{ required: true, message: '请输入资产方产品' }]
                        })(<Input />)}
                    </FormItem>

                    <FormItem label="费率" hasFeedback>
                    <Row gutter={8}>
                        <Col span={18}>
                            {getFieldDecorator('rate', {
                                rules: [{ 
                                    required: true,
                                    whitespace: true,
                                    transform: toNumber,
                                    pattern: Rules.rate,
                                    message: '请输入数字，费率最大保留3位小数'
                                }],
                                initialValue: ''
                            })(<Input />)}
                        </Col>
                        <Col span={4}>%</Col>
                    </Row>
                    </FormItem>

                    <FormItem label="还款方式" hasFeedback>
                        {getFieldDecorator('payMtd', {
                            rules: [{ required: true, message: '请选择还款方式' }]
                        })(<Select style={{width: 180}}>
                            {PAY_METHOD_MAP.map((item) => <Option value={item.id} key={item.id}>{item.item}</Option>)}
                        </Select>)}
                    </FormItem>
        
                    <FormItem label="单笔限额" hasFeedback>
                    <Row gutter={8}>
                        <Col span={18}>
                            {getFieldDecorator('singleLimit', {
                                rules: [{
                                    transform: toNumber,
                                    pattern: Rules.number,
                                    message: '大于0数字(如：8.25)'
                                }],
                                initialValue: ''
                            })(<Input onBlur={this.handleNumberFormat} />)}
                        </Col>
                        <Col span={4}>元</Col>
                    </Row>
                    </FormItem>

                    <FormItem label="日限额" hasFeedback>
                    <Row gutter={8}>
                        <Col span={18}>
                            {getFieldDecorator('dateLimit', {
                                rules: [{
                                    transform: toNumber,
                                    pattern: Rules.number,
                                    message: '大于0数字(如：8.25)'
                                }],
                                initialValue: ''
                            })(<Input onBlur={this.handleNumberFormat} />)}
                        </Col>
                        <Col span={4}>元</Col>
                    </Row>
                    </FormItem>

                    <FormItem label="总额度" hasFeedback>
                    <Row gutter={8}>
                        <Col span={18}>
                            {getFieldDecorator('totalLimit', {
                                rules: [{
                                    transform: toNumber,
                                    pattern: Rules.number,
                                    message: '大于0数字(如：8.25)'
                                }],
                                initialValue: ''
                            })(<Input onBlur={this.handleNumberFormat} />)}
                        </Col>
                        <Col span={4}>元</Col>
                    </Row>
                    </FormItem>
        
                    <FormItem>
                        <Button type="primary" htmlType="submit"> 提交 </Button>
                    </FormItem>
                    
                </Form>
            </div>
            
        )
        
    }
} )

