import React, { Component } from 'react'
import {
    Route,
    Switch,
} from 'react-router-dom'

import request from 'api/request'


import {LoadingContext} from 'commons/LoadingContext';
// bundleLoader
import BundleLoader from 'commons/BundleLoader'
// propsRoute
import PropsRoute from "commons/PropsRoute";


import List from './list'
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
                        (props) => BundleLoader(Detail, props)
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
