import React from 'react'
import { Link } from 'react-router-dom'

import BaseTableContainer from 'ROOT_SOURCE/base/BaseTableContainer'
import request from 'ROOT_SOURCE/utils/request'
import {Divider, Modal, message} from 'antd'

const confirm = Modal.confirm;
export default class extends BaseTableContainer {
    
    getTitle = () => (
        ``
    )
    
    
    getRowKey() {
        return 'id'
    }
    constructor(props) {
        super(props)
        this.deleteConfirm = this.deleteConfirm.bind(this)
    }
    deleteDate = async (index) =>{
        let { tableData, updateTable } = this.props;  
        console.log(tableData)    
        await request.post('/assetFunderRel/deleteConfigur', {id:index})
        tableData.dataSource.splice(index, 1);
        updateTable(tableData.dataSource);
        
    }
     // 删除操作
    deleteConfirm = (id, index) => {
        confirm({
            title: `确认删除当前第${index + 1}行配置？`,
            content: '',
            okText: "确认",
            cancelText:"取消",
            onOk:()=> {
               this.deleteDate(index)
            },
            onCancel() { },
        });

    }

    getColumns() {
        if (this._columns) return this._columns;
        
        let encode = window.encodeURIComponent
        let dataS = this.props.tableData.dataSource
        return this.columns = [
            {
                title: '资产方编号',
                dataIndex: 'assetCode',
                key: 'assetCode'
            }, {
                title: '资产方名称',
                dataIndex: 'assetName',
                key: 'assetName'
            }, {
                title: '资产方产品',
                dataIndex: 'assetPrdName',
                key: 'assetPrdName'
            }, {
                title: '资金方编号',
                dataIndex: 'funderCode',
                key: 'funderCode'
            }, {
                title: '资金方名称',
                dataIndex: 'funderName',
                key: 'funderName'
            }, {
                title: '资金方产品',
                dataIndex: 'funderPrdName',
                key: 'funderPrdName'
            }, {
                title: '创建时间',
                dataIndex: 'createDate',
                key: 'createDate'
            }, {
                title: '操作人',
                dataIndex: 'operator',
                key: 'operator'
            }, {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render: (text, record, index) => (
                    <span>{`${record.status}` === '1' ? '有效' : '无效'}</span>
                )
            }, {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
                render: (text, record, index) => (
                    <div>
                        <Link to={`/FundChannelCfg/item/${record.id}`}>修改</Link>
                        <Divider type="vertical" />
                        <a onClick={() => { this.deleteConfirm(record.id, index) }}>删除</a>
                    </div>
                )
            }
        ];
        
    }

}

