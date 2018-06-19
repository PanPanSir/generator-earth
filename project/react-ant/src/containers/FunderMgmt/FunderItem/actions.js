import ActionFactory from 'ROOT_SOURCE/base/ActionFactory'
import { MOD_PREFIX } from '../constants'


export const ITEM__POPULATE_DATA
	= `${MOD_PREFIX}__ITEM__POPULATE_DATA`

export const ITEM__UPDATE_DATA
	= `${MOD_PREFIX}__ITEM__UPDATE_DATA`



export const updateForm = ActionFactory.createRequest({

  	url: '/funder/updateFunder',
  	
  	type: 'post',

  	handler: (dispatch, getState, resultBody) => {
    	// 更新formData
    	dispatch({
     		type: ITEM__UPDATE_DATA,
      		payload: resultBody
   		})
    },

})

