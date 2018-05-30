import React from 'react'
import { Route } from 'react-router-dom'

// 适用于给router component添加props

const renderMergedProps = (component, ...rest) => {
    const finalProps = Object.assign({}, ...rest);
    return (
        React.createElement(component, finalProps)
    );
};


const PropsRoute = ({ component, render, ...rest }) => {
    return (
        <Route { ...rest } render={routeProps => {
            return renderMergedProps(component || render, routeProps, rest)
        }}/>
    )
};

export default PropsRoute
