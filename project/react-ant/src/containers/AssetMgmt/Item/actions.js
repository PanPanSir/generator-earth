import ActionFactory from 'ROOT_SOURCE/base/ActionFactory'
import { MOD_PREFIX } from '../constants'


export const ITEM__POPULATE_DATA
          = `${MOD_PREFIX}__ITEM__POPULATE_DATA`

export const ITEM__RESET_DATA
          = `${MOD_PREFIX}__ITEM__RESET_DATA`



export const populateForm = ActionFactory.createRequest({
    
    url: '/asset/viewAsset',
    
    type: 'get',
    
    handler: (dispatch, getState, data) => {
        // 获取数据后 更新formData
        dispatch({
            type: ITEM__POPULATE_DATA,
            payload: data
        })
        
        return data
    },
    
})


export const updateForm = ActionFactory.createRequest({
    
    url: '/asset/updateAsset',
    
    type: 'post',
    
    handler: (dispatch, getState, data) => {
        // 更新item后 重置formData
        dispatch({
            type: ITEM__RESET_DATA,
        })
        
        return data
    },
    
})

