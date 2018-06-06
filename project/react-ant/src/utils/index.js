import store from './store'
import { GLOBAL_LOADING } from 'INDEX_ROOT_SOURCE/actions/framework'



export const sleep = (n) => {
    return new Promise(resolve=>{
        setTimeout( ()=>resolve(), n )
    })
}


export const startLoadingAnimation = () => {
    store.dispatch({
        type: GLOBAL_LOADING,
        payload: true,
    })
}


export const stopLoadingAnimation = () => {
    store.dispatch({
        type: GLOBAL_LOADING,
        payload: false,
    })
}
