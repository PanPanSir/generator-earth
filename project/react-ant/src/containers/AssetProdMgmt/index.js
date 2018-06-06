import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import List from './List/'
import Add  from './add'

export default ({match}) => {

    const ROUTE_LIST = `${match.path}/list`,
          ROUTE_ADD  = `${match.path}/add`;
    
    return (
        <Switch>
            <Route path={ROUTE_LIST} render={(props)=><List {...props}/>} />
            <Route path={ROUTE_ADD}  render={(props)=><Add  {...props}/>} />
            <Redirect to={{pathname: ROUTE_LIST}} />
        </Switch>
    )
}


