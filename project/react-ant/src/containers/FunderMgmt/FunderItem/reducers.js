import {
    ITEM__POPULATE_DATA,
    ITEM__UPDATE_DATA
} from './actions'

import ReducerFactory from 'ROOT_SOURCE/base/ReducerFactory'


export const FunderMgmt__Item = ReducerFactory.createItemPageReducer(
    ITEM__POPULATE_DATA,
)

