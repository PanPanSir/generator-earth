import {
    ADD__GET_FUNDERNAMES
} from './actions'

import ReducerFactory from 'ROOT_SOURCE/base/ReducerFactory'


export const FunderProdMgmt__Add = ReducerFactory.createReducers({
    reducedBy: ADD__GET_FUNDERNAMES,
    key: 'funderNames',
    defVal: []
})