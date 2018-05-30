import React, { Component } from 'react'
import request from 'api/request'
import { LoadingContext } from '../loading-context'


import {
    Route,
    Switch,
} from 'react-router-dom'

// bundleLoader
import Bundle from 'commons/BundleLoader'

import List from './list'
import PropsRoute from "../../../../components_common/PropsRoute";
const Detail = () => import('./detail' /* webpackChunkName:"site_detail" */);


class Site extends Component {


    constructor (props) {

        super(props);
        this.state = {

            listData: []

        };


        this._isMounted = false;

    }

    componentDidMount () {

        this._isMounted = true;

        const { listData } = this.state;

        if (listData.length > 0) return;

        this.fetchListData();

    }

    componentWillUnmount () {

        this._isMounted = false;

        console.log('dont forget clear timer or remove listener');

    }

    fetchListData () {

        this.props.loadingChangeHandle(true);

        request.post('/test/aaa', {})
            .then((data) => {

                this.props.loadingChangeHandle(false);

                this._isMounted && this.setState({ listData: data })

            })

    }


    render () {

        const { match } = this.props;
        const { listData } = this.state;

        // return cloneChildren
        return (
            <Switch>
                <PropsRoute
                    exact
                    path={`${match.path}`}
                    component={ List }

                    listData={ listData }

                />
                <Route
                    path={`${match.path}/:id`}
                    render={
                        (props) => (
                            <Bundle load={Detail}>
                                {(Mod) => (<Mod {...props}/>)}
                            </Bundle>
                        )
                    }
                />
            </Switch>
        )

    }

}

const SiteWithLoadingContext = (props) => {
    return (
        <LoadingContext.Consumer>
            {({loadingChangeHandle}) => {
                return <Site loadingChangeHandle={loadingChangeHandle} {...props}/>

            }}
        </LoadingContext.Consumer>
    )
}

export default SiteWithLoadingContext
