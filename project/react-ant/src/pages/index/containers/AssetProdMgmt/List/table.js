import React from 'react'
import { Link } from 'react-router-dom'

import BaseTableContainer from 'ROOT_SOURCE/base/BaseTableContainer'

// import { decimalizeMoney, formatDate } from 'ROOT_SOURCE/utils/FieldFormatter'

const payMtdMapping = {
    "1": "到期还本付息",
    "2": "等额本息",
    "3": "等额本金",
    "4": "按月付息，到期还本"
};

export default class extends BaseTableContainer {
    
    getTitle = () => (
        ``
    )
    
    
    getRowKey() {
        return 'id'
    }
    
    
    getColumns() {
        if (this._columns) return this._columns;
        
        let encode = window.encodeURIComponent

        return this._columns = [{
            title: '资产方编号',
            dataIndex: 'assetCode',
            key: 'assetCode'
        }, {
            title: '资产方名称',
            dataIndex: 'assetName',
            key: 'assetName'
        }, {
            title: '产品编号',
            dataIndex: 'assetPrdCode',
            key: 'assetPrdCode'
        }, {
            title: '产品名称',
            dataIndex: 'assetPrdName',
            key: 'assetPrdName'
        }, {
            title: '费率',
            dataIndex: 'rate',
            key: 'rate'
        }, {
            title: '单笔限额',
            dataIndex: 'singleLimit',
            key: 'singleLimit'
        }, {
            title: '日限额',
            dataIndex: 'dateLimit',
            key: 'dateLimit'
        }, {
            title: '总额度',
            dataIndex: 'totalLimit',
            key: 'totalLimit'
        }, {
            title: '还款方式',
            dataIndex: 'payMtd',
            key: 'payMtd',
            render: (text, record) => (
                <span>{payMtdMapping[record.payMtd]}</span>
            )
        }, {
            title: '创建时间',
            dataIndex: 'createDate',
            key: 'createDate'
        }, {
            title: '操作人',
            dataIndex: 'operator',
            key: 'operator'
        }]
    }

}

