import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Switch, Route, Link } from 'react-router-dom'
import { Layout, Menu, Icon, Spin } from 'antd'

import AsyncBundle from 'ROOT_SOURCE/base/AsyncBundle'

import './App.scss'


import Home from 'ROOT_SOURCE/containers/Home/'
import TransactionQuery from 'ROOT_SOURCE/containers/TransactionQuery/'
import Reconciliation from 'ROOT_SOURCE/containers/Reconciliation/'


//1
const AssetMgmtAsync = () => import(
    'ROOT_SOURCE/containers/AssetMgmt/' /* webpackChunkName:"AssetMgmt" */
)
const AssetMgmt = (props) => (
    <AsyncBundle load={AssetMgmtAsync}>
        {(Mod) => (<Mod {...props}/>)}
    </AsyncBundle>
)


//2
const AssetProdMgmtAsync = () => import(
    'ROOT_SOURCE/containers/AssetProdMgmt/' /* webpackChunkName:"AssetProdMgmt" */
)
const AssetProdMgmt = (props) => (
    <AsyncBundle load={AssetProdMgmtAsync}>
        {(Mod) => (<Mod {...props}/>)}
    </AsyncBundle>
)


//3
const FundChannelCfgAsync = () => import(
    'ROOT_SOURCE/containers/FundChannelCfg/' /* webpackChunkName:"FundChannelCfg" */
)
const FundChannelCfg = (props) => (
    <AsyncBundle load={FundChannelCfgAsync}>
        {(Mod) => (<Mod {...props}/>)}
    </AsyncBundle>
)


//4
const FunderMgmtAsync = () => import(
    'ROOT_SOURCE/containers/FunderMgmt/' /* webpackChunkName:"FunderMgmt" */
)
const FunderMgmt = (props) => (
    <AsyncBundle load={FunderMgmtAsync}>
        {(Mod) => (<Mod {...props}/>)}
    </AsyncBundle>
)


//5
const FunderProdMgmtAsync = () => import(
    'ROOT_SOURCE/containers/FunderProdMgmt/' /* webpackChunkName:"FunderProdMgmt" */
)
const FunderProdMgmt = (props) => (
    <AsyncBundle load={FunderProdMgmtAsync}>
        {(Mod) => (<Mod {...props}/>)}
    </AsyncBundle>
)




const { Header, Content, Sider } = Layout;
const { SubMenu, Item } = Menu;



/**
 * 路由细节
 * https://github.com/jiajianrong/documents/blob/master/react/react-router%E9%9B%86%E6%88%90antd%20-%20%E8%B7%AF%E7%94%B1%E6%96%B9%E6%A1%88.md
 **/

class App extends Component {
    

    render () {
        
        let totalPath = this.props.location.pathname
        let prefixPath = totalPath.match(/^\/[^/]*/)[0]
        
        let globalLoading = this.props.globalLoading
        
        return (
            <Spin spinning={globalLoading} style={{ maxHeight: window.innerHeight }}>
            <Layout style={{ minHeight: '100vh' }}>
            
                <Sider collapsible>
                    <div className="logo">金融</div>
                    <Menu theme="dark"
                        defaultSelectedKeys={['/']}
                        defaultOpenKeys={['/Asset','/Funder']}                     
                        mode="inline"
                        selectedKeys={[prefixPath]}
                        >
                        <Item key="/">
                            <Icon type="book" />
                            <span>首页</span>
                            <Link to="/"></Link>
                        </Item>
                        
                        <SubMenu key="/Asset" title={<span><Icon type="book"/>资产方</span>}>
                            <Item key="/AssetMgmt">
                                <span>资产方管理</span>
                                <Link to="/AssetMgmt"></Link>
                            </Item>
                            <Item key="/AssetProdMgmt">
                                <span>产品管理</span>
                                <Link to="/AssetProdMgmt"></Link>
                            </Item>
                            <Item key="/FundChannelCfg">
                                <span>资金通道配置</span>
                                <Link to="/FundChannelCfg"></Link>
                            </Item>
                        </SubMenu>
                        
                        <SubMenu key="/Funder" title={<span><Icon type="book"/>资金方</span>}>
                            <Item key="/FunderMgmt">
                                <span>资金方管理</span>
                                <Link to="/FunderMgmt"></Link>
                            </Item>
                            <Item key="/FunderProdMgmt">
                                <span>产品管理</span>
                                <Link to="/FunderProdMgmt"></Link>
                            </Item>
                        </SubMenu>
                        
                        <Item key="/TransactionQuery">
                            <Icon type="book"/>
                            <span>交易查询</span>
                            <Link to="/TransactionQuery"></Link>
                        </Item>
                        
                        <Item key="/Reconciliation">
                            <Icon type="book"/>
                            <span>对账管理</span>
                            <Link to="/Reconciliation"></Link>
                        </Item>
                    </Menu>
                </Sider>
                
                
                <Layout>
                    <Header style={{ background: '#fff', textAlign: 'center' }}>
                        <h1>金融</h1>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Switch>
                            {/* 首页 */}
                            <Route exact path="/" component={Home}/>
                            
                            {/* 资产方管理 */}
                            <Route path="/AssetMgmt" component={AssetMgmt}/>
                            {/* 产品管理 */}
                            <Route path="/AssetProdMgmt" component={AssetProdMgmt}/>
                            {/* 资金通道配置 */}
                            <Route path="/FundChannelCfg" component={FundChannelCfg}/>
                            
                            {/* 资金方管理 */}
                            <Route path="/FunderMgmt" component={FunderMgmt}/>
                            {/* 产品管理 */}
                            <Route path="/FunderProdMgmt" component={FunderProdMgmt}/>
                            
                            {/* 交易查询 */}
                            <Route path="/TransactionQuery" component={TransactionQuery}/>
                            {/* 对账管理 */}
                            <Route path="/Reconciliation" component={Reconciliation}/>
                            
                        </Switch>
                    </Content>
                </Layout>
            
            </Layout>
            </Spin>
        )
    }

}

export default connect( state => ({globalLoading: state.globalLoading}) )(App);
