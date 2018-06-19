import {
    LIST__UPDATE_FORM_DATA,
    LIST__UPDATE_TABLE_DATA
} from './actions'

import ReducerFactory from 'ROOT_SOURCE/base/ReducerFactory'


export const FundChannel__List = ReducerFactory.createListPageReducer(
    LIST__UPDATE_FORM_DATA,
    LIST__UPDATE_TABLE_DATA,
)
