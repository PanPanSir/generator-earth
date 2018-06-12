import React from 'react'
import qs from 'query-string'
import { getRequestParams } from 'tools/utils'

const Detail = ({match, location}) => {


    const query = getRequestParams();

    return (

        <div style={{height: '2000px'}}>{`hi my id is ${match.params.id}, ts is ${query.ts}`}</div>

    )

}

export default Detail
