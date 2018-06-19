import { 
    ITEM__POPULATE_DATA,
    ITEM__RESET_DATA,
} from './actions'

import ReducerFactory from 'ROOT_SOURCE/base/ReducerFactory'


export const AssetMgmt__Item = ReducerFactory.createItemPageReducer(
    ITEM__POPULATE_DATA,
    ITEM__RESET_DATA,
)

