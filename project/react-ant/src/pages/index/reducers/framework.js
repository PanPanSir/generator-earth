import {
    GLOBAL_LOADING,
} from 'INDEX_ROOT_SOURCE/actions/framework'



export function globalLoading(previousState=false, action) {
    switch (action.type) {
        case GLOBAL_LOADING:
            return action.payload

        default:
            return previousState
    }
}
