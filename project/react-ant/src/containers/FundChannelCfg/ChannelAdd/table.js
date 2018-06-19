import React from 'react';
import {Table, Button, Modal, message} from 'antd';
import request from 'ROOT_SOURCE/utils/request'
import BaseTableContainer from 'ROOT_SOURCE/base/BaseTableContainer'


const confirm = Modal.confirm;

class ConfigurAddTable extends BaseTableContainer {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: '资产方名称',
                dataIndex: 'assetName',
                key: 'assetName.label'
            }, {
                title: '资产方产品',
                dataIndex: 'assetPrdName',
                key: 'assetPrdName.label'
            }, {
                title: '资金方名称',
                dataIndex: 'funderName',
                key: 'funderName.label'
            }, {
                title: '资金方产品',
                dataIndex: 'funderPrdName',
                key: 'funderPrdName.label'
            }, {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render: (text, record, index) => {
                    switch (`${record.status}`) {
                        case '0':
                            return <span
                                style={{
                                color: '#FF0000'
                            }}>冲突</span>

                        case '1':
                            return <span
                                style={{
                                color: '#00FF7F'
                            }}>有效</span>

                        default:
                            return <span>-</span>
                    }
                }
            }, {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
                width: 100,
                render: (text, record, index) => (
                    <a
                        onClick={() => {
                        this.deleteConfirm(index)
                    }}>删除</a>
                )
            }
        ];
    }
   

    deleteConfirm = (index) => {
        const deleDate=this.deleDate
        confirm({
            title: `确认删除当前第${index + 1}行配置？`,
            content: '',
            okText: "确认",
            cancelText:"取消",
            onOk() {
                deleDate(index)
            },
            onCancel() {}
        });
    }

    deleDate=(index)=>{
        this.props.params.splice(index, 1);
        this.props.updateTableAdd(this.props.params)                
    }

    hanleSubmit = () => {
        let flag = true;
        // 如果没有添加数据则直接跳转回去
        if (!this.props.params.length) {
            return this.handleRedirection();
        }
        // 如果提交中冲突的禁止提交
        for (const value of this.props.params) {

            if (`${value.status}` === '0') {
                flag = false;
                break;
            }
        }
        if (!flag) {
            message.error('提交数据有冲突配置，请处理冲突后提交');
            return;
        }
        // 提交表单并跳转页面

         // action
        request.post('/assetFunderRel/addAssetPrdFunderPrdRel', this.props.params)
                
        // 提交后返回list页
        this.props.history.push('/FundChannelCfg/list')
      
    }

    // 页面跳转
    handleRedirection = () => {
        this.a()
        // this.context.router.push('/FundChannelCfg/list');
        this.props.history.push('/FundChannelCfg/list')
    }

    render() {
        const { params} = this.props;
        return (
            <div>
                <Table
                    title={() => '资金通道列表'}
                    className='table'
                    columns={this.columns}
                    dataSource={params}
                    rowKey={(record, index) => index}
                    pagination={false}/>

                <div style={{float:'right',padding:'30px 60px 0 0'}}>
                    <Button type="primary" onClick={this.hanleSubmit}>
                        提交
                    </Button>
                </div>
            </div>
        );
    }
}

export default ConfigurAddTable;

