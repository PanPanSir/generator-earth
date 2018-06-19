import moment from 'moment'
import React from 'react'
import { DatePicker, Button, Form, Input, Col,Row ,Icon} from 'antd'

import BaseContainer from 'ROOT_SOURCE/base/BaseContainer'

import { sleep } from 'ROOT_SOURCE/utils/index'
import rules from 'ROOT_SOURCE/utils/validateRules'
import AccountInfo from '../accountInfo'

const FormItem = Form.Item


export default Form.create()( class extends BaseContainer {
    
    constructor(props) {
        super(props);
        this.state = {
            bankCardList: []
        };
        this.uuid = 0;
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

            let {
                id,
                funderName,
                contract,
                contractDate,
                totalFund,
                whiteLists,
                funderCode
            } = values;

            //处理白名单的值；删除空值;
            //如果白名单全部被删除，则需要给whiteLists赋空数组
            //如果白名单不为空，需要将白名单转成数组，因为前期白名单为对象
            //如果白名单中有重复值，需要去重处理

            let whiteArray = form.getFieldValue('whiteLists');
            let whiteListsArray = (whiteArray && Array.from(Object.values(whiteArray))) || [];
            whiteLists = whiteListsArray;
            
            let params, accountInfo = [];
            const {bankCardList} = this.state;

            // 处理时间提交格式
            contractDate = (contractDate && moment(contractDate).format('YYYY-MM-DD HH:mm:ss')) || '';
            // 处理提交账户信息为数组提交
            bankCardList.forEach((item, i) => {
                const accountNumber = values[`accountNumber-${item.key}`],
                    accountDescription = values[`accountDescription-${item.key}`];

                accountNumber && accountInfo.push({accountNumber, accountDescription});
            });

            params = {
                id,
                funderName,
                contract,
                contractDate,
                totalFund,
                whiteLists,
                funderCode,
                accountInfo: JSON.stringify(accountInfo)
            };
            
            // 提交表单最好新起一个事务，不受其他事务影响
            await sleep(0)            
            // action
            await this.props.updateForm(params)
            
            
            // 提交后返回list页
            this.props.history.push('/FunderMgmt/list')
        })
    }
    
    componentDidMount() {
        const index = this.props.match.params.id
        const dataSource = this.props.tableData.dataSource? this.props.tableData.dataSource:[{}]
        let accountInfo = this.defaultAccount(dataSource[index]);
        this.setState({
            bankCardList: accountInfo
        });
        
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


    //开户行初始化处理
    defaultAccount = data => {
        let accountInfo = data.accountInfo && JSON.parse(data.accountInfo);

        if (accountInfo && accountInfo.length) {
            // 给每个账户一个唯一key值
            for (const [i, val] of accountInfo.entries()) {
                val['key'] = +new Date() + Number(i);
            }
        } else {
            accountInfo = [{
                // 设置唯一key值
                key: +new Date()
            }];
        }
        return accountInfo;
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
        const initData = [{
            funderName:'',
            contract:'',
            contractDate:'',
            totalFund:'',
            whiteLists:[],
            accountInfo:[]
        }]
        let  dataSource = this.props.tableData.dataSource? this.props.tableData.dataSource : initData
        const index = this.props.tableData.dataSource?this.props.match.params.id:0
        const {funderName, contract, contractDate, totalFund, whiteLists, accountInfo} = dataSource[index]
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
        
         //初始化keys的默认值;初始值必须是一个数组；也就是白名单必须是一个数组
        let whiteListsArray = whiteLists && Array.from(Object.values(whiteLists));
        getFieldDecorator('keys', {initialValue: whiteListsArray || []});
        const keys = getFieldValue('keys');
        const formItems = keys && keys.map((item, index) => {

        return (
                <FormItem
                label={index === 0 ? <span>白名单</span> : <span></span>}
                required={false}
                key={item}
                {...formItemLayout}
                colon={false}>

                <Col span={23}>
                    {getFieldDecorator(`whiteLists[${isNaN(item) ? item.split('.').join(",") : item}]`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            pattern: rules.ip,
                            message: "请输入正确的白名单",
                            required: true
                        }],
                        initialValue: isNaN(item) ? item.split(',').join(".") : "",
                    })(
                        <Input disabled={type === "review"} placeholder={"255.255.255.255"} addonBefore="http://"/>
                    )}
                </Col>

                <Col span={1} style={{display: (type === "update" ? "blo" : "none")}}>
                    <Button type="danger"
                            style={{
                                color: "red",
                                backgroundColor: "#fff",
                                border: 'none'
                            }}
                            onClick={() => {
                                this.removeWhite(item)
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
                        initialValue: funderName || ''
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
                        initialValue: contract ||''
                    })(<Input placeholder="请输入签约主体"/>)}
                        </Col>
                    </Row>
                </FormItem>

                <FormItem colon={false} {...formItemLayout} label={(<span>签约时间</span>)}>
                    <Row align="top" type="flex">
                        <Col span="23">
                        {getFieldDecorator('contractDate', {
                            rules: [
                                { required: true, message: '请选择签约时间'},
                            ],
                            initialValue: (contractDate && moment(contractDate)) || undefined

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

