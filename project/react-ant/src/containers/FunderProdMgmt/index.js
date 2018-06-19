import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import List from './List';
import Add from './Add'

export default ({match}) => {
    return (
        <Switch>
            <Route path={`${match.path}/list`} component={List}/>
            <Route path={`${match.path}/add`} component={Add}/>
            <Redirect to={{pathname: `${match.path}/list`}}/>
        </Switch>
    )
}


