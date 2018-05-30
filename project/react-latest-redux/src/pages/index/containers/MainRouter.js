import React from 'react'
import Home from "./Home";
import Site from './Site'

import {
    Route,
    Switch,
    Redirect,
    withRouter
} from 'react-router-dom'
import FooterBar from 'commons/FooterBar'

// scrollToTop
import ScrollToTop from 'commons/ScrollToTop'
// bundleLoader
import Bundle from 'commons/BundleLoader'



const My = () => import('./My' /* webpackChunkName:"My" */);

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

                <FooterBar/>

                <Switch>
                    <Route path='/home' component={Home}/>
                    <Route path='/site' component={Site}/>
                    <Route path='/my'
                           render={
                               (props) => bundleLoader(My, props)
                           }/>

                    <Redirect to='/home'/>
                </Switch>
            </ScrollToTop>
        )
    }
}

export default withRouter(MainRouter)
