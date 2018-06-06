import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Switch, Route, Link } from 'react-router-dom'
import { Layout, Menu, Icon, Spin } from 'antd'

import AsyncBundle from 'ROOT_SOURCE/base/AsyncBundle'

import './App.scss'


import Home from 'ROOT_SOURCE/containers/Home/'


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
                    <div className="logo">LOGO</div>
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
                        
                    </Menu>
                </Sider>
                
                
                <Layout>
                    <Header style={{ background: '#fff', textAlign: 'center' }}>
                        <h1>58金融</h1>
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
                            
                        </Switch>
                    </Content>
                </Layout>
            
            </Layout>
            </Spin>
        )
    }

}

export default connect( state => ({globalLoading: state.globalLoading}) )(App);
