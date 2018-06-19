import moment from 'moment'
import React from 'react'
import { DatePicker, Button, Form, Input, Col,Row ,Icon} from 'antd'
import request from 'ROOT_SOURCE/utils/request'


import BaseContainer from 'ROOT_SOURCE/base/BaseContainer'

import { sleep } from 'ROOT_SOURCE/utils/index'
import { mapMoment } from 'ROOT_SOURCE/utils/fieldFormatter'
import rules from 'ROOT_SOURCE/utils/validateRules'
import AccountInfo from './accountInfo'

const FormItem = Form.Item


export default Form.create()( class extends BaseContainer {
    
    constructor(props) {
        super(props);
        this.uuid = 1;
        this.state = {
            bankCardList: [{
                // 设置唯一key值
                key: +new Date()
            }]
        };
    }
    /**
     * 提交表单
     * @override
     */
    submitForm = (e) => {
        
        e && e.preventDefault()
        
        const { form } = this.props
        
        form.validateFieldsAndScroll(async (err, values) => {
            if (err) {
                return;
            }
            
            // 提交表单最好新起一个事务，不受其他事务影响
            await sleep(0)
            
            let _formData = { ...form.getFieldsValue() }
            
            // _formData里的一些值需要适配
            _formData = mapMoment(_formData, 'YYYY-MM-DD HH:mm:ss')
            
            // action
            await request.post('/funder/addFunder', _formData)
            
            // 提交后返回list页
            this.props.history.push('/FunderMgmt/list')
        })
    }
    
    
    
    componentDidMount() {
        let itemId = this.props.match.params.id
        // this.props.populateForm({id: itemId})
    }
    
    //添加白名单
    addWhiteList = () => {
        const {form} = this.props;
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(this.uuid);
        this.uuid++;
        form.setFieldsValue({keys: nextKeys})
    };

     //删除白名单
    removeWhite = (k) => {
        const {form} = this.props;
        let keys = form.getFieldValue('keys');
        if (keys.length === 1) {return false;}
        if (keys.length !== 0) {
            keys = keys.filter((key) => {
                return key !== k
            });
        }
        form.setFieldsValue({keys: keys})
    };
    
     //新增开户账户
    handleAddItem = e => {
        e.preventDefault();
        const {bankCardList} = this.state;
        let list = [].concat(bankCardList, {
            key: +new Date(),
        });
        this.setState({
            bankCardList:list
        })
    };

    //删除开户账户
    handleDeleteItem = (e, bankAccount) => {
        e.preventDefault();
        const {bankCardList} = this.state;
        let bankCard = bankCardList.filter((item) => {
            return item.key !== bankAccount
        });
        this.setState({bankCardList: bankCard});
    };
    render() {
        const {form, type} = this.props;
        const {getFieldDecorator, getFieldValue} = form;
        const {funderName,contract,contractDate,totalFund }=FormData
        //用来标记白名单的key值
        getFieldDecorator('keys', {initialValue: [0]});
        const keys = getFieldValue('keys');
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
        const formItems = keys && keys.map((key, index) => {

            return (

                <FormItem
                    label={index === 0 ? <span>白名单</span> : <span></span>}
                    required={false}
                    {...formItemLayout}
                    key={key}
                    colon={false}>

                    <Col span="23">
                        {getFieldDecorator(`whiteLists[${key}]`, {
                            validateTrigger: ['onChange', 'onBlur'],
                            rules: [{
                                pattern: rules.ip,
                                message: "请输入正确的白名单",
                            }],
                        })(
                            <Input placeholder={"255.255.255.255"} addonBefore="http://"/>
                        )}
                    </Col>

                    <Col span="1">
                        <Button type="danger"
                                style={{
                                    color: "red",
                                    backgroundColor: "#fff",
                                    border: 'none',
                                    opacity: (keys.length > 1 ? 1 : 0)
                                }}
                                onClick={() => {
                                    if (keys.length > 1) {
                                        this.removeWhite(key)
                                    } else {
                                        return false;
                                    }
                                }}
                        >删除</Button>
                    </Col>

                </FormItem>

            )

        });
        return (<div className="ui-background">
            <Form layout="horizontal" style={{ maxWidth: '400px'}} onSubmit={this.submitForm}>

                <FormItem colon={false} {...formItemLayout} label={(<span>资金方名称</span>)}>
                    <Row align="top" type="flex">
                        <Col span="23">
                    {getFieldDecorator('funderName', {
                        rules: [
                            {required: true, message: '请输入资金方名称'},
                        ],
                        initialValue:''
                    })(
                        <Input placeholder="请输入资金方名称"/>
                    )}
                        </Col>
                    </Row>
                </FormItem>

                <FormItem colon={false} {...formItemLayout} label={(<span>签约主体</span>)} >
                    <Row align="top" type="flex">
                        <Col span="23">
                    {getFieldDecorator('contract', {
                        rules: [
                            {required: true, message: '请输入签约主体'},
                        ],
                    })(<Input placeholder="请输入签约主体"/>)}
                        </Col>
                    </Row>
                </FormItem>

                <FormItem colon={false} {...formItemLayout} label={(<span>签约时间</span>)}>
                    <Row align="top" type="flex">
                        <Col span="23">
                        {getFieldDecorator('contractDate', {
                            rules: [
                                {required: true, message: '请选择签约时间'},
                            ],
                        })(<DatePicker placeholder="请选择签约时间" showTime 
                                       style={{width: '100%'}}/>)}
                    </Col>
                    </Row>
                </FormItem>

                <FormItem colon={false} {...formItemLayout} label={(<span>资金总额度</span>)}>
                    <Row align="top" type="flex">
                        <Col span="23">
                            {getFieldDecorator('totalFund', {
                                rules: [
                                    {pattern: rules.number, message: '大于0数字(如：8.25)'},
                                ],
                                initialValue: totalFund||''
                            })(<Input placeholder="请输入资金总额度" onBlur={this.handleNumberFormat}/>)}
                        </Col>
                        <Col span="1">
                            <div style={{padding: "0 25px"}}>
                                元
                            </div>
                        </Col>
                    </Row>
                </FormItem>

                {formItems}

                <FormItem colon={false} {...formItemLayout} label={(<span></span>)}>
                    <div onClick={this.addWhiteList}>
                        <Icon type="plus" style={{color: "red"}}/>
                        <span style={{color: "red"}}>添加一条白名单记录</span>
                    </div>
                </FormItem>

                {/* ================== 开户账户 ===================== */}
                <AccountInfo
                    form={form}
                    type={type}
                    bankCardList={this.state.bankCardList}
                    handleDeleteItem={this.handleDeleteItem}
                    rule={rules}
                    />

                <FormItem colon={false} {...formItemLayout} label={(<span></span>)}>
                    <div>
                        <a onClick={(e) => this.handleAddItem(e)} >+新增开户账号</a>
                    </div>
                </FormItem>


                <FormItem  wrapperCol={{
                        xs: { span: 24, offset: 0 },
                        sm: { span: 16, offset: 8 },
                    }}>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </FormItem>

            </Form>
            </div>
        );
    }
})

