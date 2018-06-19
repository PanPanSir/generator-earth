import React from 'react'
import { Link } from 'react-router-dom'

import BaseTableContainer from 'ROOT_SOURCE/base/BaseTableContainer'
import request from 'ROOT_SOURCE/utils/request'
import {Divider, Modal, message} from 'antd'

const confirm = Modal.confirm;
export default class extends BaseTableContainer {
    
    
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
        
        return this._columns = this._columns || [{
                title: '资金方编号',
                dataIndex: 'funderCode',
                key: 'funderCode'
            }, {
                title: '资金方名称',
                dataIndex: 'funderName',
                key: 'funderName'
            }, {
                title: '签约主体',
                dataIndex: 'contract',
                key: 'contract'
            }, {
                title: '签约时间',
                dataIndex: 'contractDate',
                key: 'contractDate'
            }, {
                title: '资金总金额',
                dataIndex: 'totalFund',
                key: 'totalFund'
            }, {
                title: '创建时间',
                dataIndex: 'createDate',
                key: 'createDate'
            }, {
                title: '操作人',
                dataIndex: 'operator',
                key: 'operator'
            }, {
                title: '操作',
                key: 'action',
                render: (text, record, index) => (
                    <div>
                        <Link to={`/FunderMgmt/item/${record.id}`}>修改</Link>
                    </div>
                )
            }
        ];
        
    }

}

