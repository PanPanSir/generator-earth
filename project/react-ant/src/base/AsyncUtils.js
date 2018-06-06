import { combineReducers } from 'redux'

import store from 'ROOT_SOURCE/utils/store'


/**
 * inject async reducers object into store
 */
export function injectReducer(asyncReducers/*obj*/) {
    store.allReducers = {
        ...store.allReducers,
        ...asyncReducers,
    }
    store.replaceReducer( combineReducers(store.allReducers) )
}
