import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Channelist from './ChannelList/'
import ChannelAdd from './ChannelAdd/'
import ChannelItem from './ChannelItem/'



export default ({match}) => {
    return (
        <Switch>
            <Route path={`${match.path}/list`} component={Channelist} />
            <Route path={`${match.path}/item/:id`} component={ChannelItem}/>
            {/* <Route path={`${match.path}/item/:code/:name/:date`} component={ChannelItem}/>             */}
            <Route path={`${match.path}/add`} render={(props)=><ChannelAdd {...props}/>}/>            
            <Redirect to={{pathname:`${match.path}/list`}}/>
        </Switch>

    )
}


