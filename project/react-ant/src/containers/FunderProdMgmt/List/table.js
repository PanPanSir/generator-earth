import BaseTableContainer from 'ROOT_SOURCE/base/BaseTableContainer'

export default class extends BaseTableContainer {
    

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
            title: '资金产品名称',
            dataIndex: 'funderPrdName',
            key: 'funderPrdName'
        }, {
            title: '单笔限额',
            dataIndex: 'singleLimit',
            key: 'singleLimit'
        }, {
            title: '日限额',
            dataIndex: 'dateLimit',
            key: 'dateLimit'
        }, {
            title: '资金产品额度',
            dataIndex: 'funderLimit',
            key: 'funderLimit'
        }, {
            title: '费率',
            dataIndex: 'rate',
            key: 'rate'
        }, {
            title: '还款方式',
            dataIndex: 'payMtd',
            key: 'payMtd'
        }, {
            title: '创建时间',
            dataIndex:'createDate',
            key: 'createDate'
        }, {
            title:'操作人',
            dataIndex:'operator',
            key:'operator'
        }, {
            title:'备注',
            dataIndex:'remarks',
            key:'remarks'
        }]
    }
}