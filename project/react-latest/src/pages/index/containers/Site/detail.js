import React from 'react'
import qs from 'query-string'

const Detail = ({match, location}) => {

    const query = qs.parse(location.search);

    return (

        <div style={{height: '2000px'}}>{`hi my id is ${match.params.id}, ts is ${query.ts}`}</div>

    )

}

export default Detail
