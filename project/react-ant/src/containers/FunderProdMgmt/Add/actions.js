import ActionFactory from 'ROOT_SOURCE/base/ActionFactory'
import { MOD_PREFIX } from '../constants'


export const ADD__GET_FUNDERNAMES
          = `${MOD_PREFIX}__ADD__GET_FUNDERNAMES`;

export const getFunderNames = ActionFactory.createRequest({

    url:'/funder/getFunderDict',
    
    type: 'get',

    handler:(dispatch, getState, data) => {
        
        dispatch({
            type: ADD__GET_FUNDERNAMES,
            payload: data
        });

        return data
    },
});

