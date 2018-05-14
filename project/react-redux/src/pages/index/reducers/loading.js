import { CHANGE_LOADING_STATE } from '../actions/common_loading'
import { initLoadingShow } from './initState'

export const loadingData = (state = initLoadingShow, action) => {

    switch (action.type) {

        case CHANGE_LOADING_STATE:

            return action.data

        default:

            return state

    }

}
