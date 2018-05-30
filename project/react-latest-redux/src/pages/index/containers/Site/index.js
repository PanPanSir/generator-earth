import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchListData } from '../../actions/list'

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

    }

    componentDidMount () {

        const { listData } = this.state;

        if (listData.length > 0) return;

        this.props.fetchListData();

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

const mapStateToProps = (state) => {

    return {
        listData: state.listData
    }

};

const mapDispatchToProps = (dispatch, ownProps) => {

    return {
        fetchListData: (...args) => dispatch(fetchListData(...args)),
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(Site)
