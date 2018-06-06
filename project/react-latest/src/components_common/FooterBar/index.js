import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import './index.scss';
import cn from 'classnames';

const ROUTE_MAP = {
    'home': '/home',
    'site': '/site',
    'my': '/my'
}

const FooterBar = ({match, location, history}) => {

    const getActiveTabClassName = (tabName) => {
        if (location.pathname === tabName) {
            return "tab-selected"
        }

        return ''
    }


    return (

    	<div className='m-footer-bar'>

    		<Link to='/home' className={cn('tab', getActiveTabClassName(ROUTE_MAP.home))}>tab1</Link>
        	<Link to='/site' className={cn('tab', getActiveTabClassName(ROUTE_MAP.site))}>tab2</Link>
        	<Link to='/my' className={cn('tab', getActiveTabClassName(ROUTE_MAP.my))}>tab3</Link>

    	</div>

    )

};

export default withRouter(FooterBar)
