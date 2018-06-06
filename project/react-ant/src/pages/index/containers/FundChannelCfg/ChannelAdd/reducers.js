import {
    ADD__LIST__UPDATE_FORM_DATA,
    ADD__LIST__UPDATE_TABLE_DATA
} from './actions'

import ReducerFactory from 'ROOT_SOURCE/base/ReducerFactory'


export const FundChannel__Add__List = ReducerFactory.createListingPage(
    ADD__LIST__UPDATE_FORM_DATA,
    ADD__LIST__UPDATE_TABLE_DATA,
)
