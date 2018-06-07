import React from 'react'
import Home from "./Home";
import Site from './Site'

import {
    Route,
    Switch,
    Redirect,
    withRouter
} from 'react-router-dom'

// scrollToTop
import ScrollToTop from 'commons/ScrollToTop'
// bundleLoader
import Bundle from 'commons/BundleLoader'


// 异步加载文件 参考文档 https://webpack.js.org/guides/code-splitting/#dynamic-imports
// 参数中的注释部分不建议删除，原因请看上述文档
const My = () => import( './My' /* webpackChunkName:"My" */ );

/**
 * 异步加载loading加载
 * @param Comp Component组件
 * @param props router的props
 * @returns {*}
 */
const bundleLoader = (Comp, props) => {
    return (
        <Bundle load={ Comp } loadingComp={ <p>loading..</p> }>
            {(Mod) => (<Mod {...props}/>)}
        </Bundle>
    )
};

class MainRouter extends React.PureComponent {
    render() {
        return (
            <ScrollToTop>
                <Switch>
                    <Route path='/home' component={Home}/>
                    <Route path='/site' component={Site}/>
                    <Route path='/my'
                           render={
                               (props) => My().then(
                                   (mod) => {
                                       return mod.default ? mod.default : mod
                                   }
                               )
                           }/>

                    <Redirect to='/home'/>
                </Switch>
            </ScrollToTop>
        )
    }
}

export default withRouter(MainRouter)
