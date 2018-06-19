import ActionFactory from 'ROOT_SOURCE/base/ActionFactory'
import { MOD_PREFIX } from '../constants'


export const LIST__UPDATE_FORM_DATA
    = `${MOD_PREFIX}__LIST__UPDATE_FORM_DATA`

export const LIST__UPDATE_TABLE_DATA
    = `${MOD_PREFIX}__LIST__UPDATE_TABLE_DATA`



export const updateTable = ActionFactory.createUpdateTable({

    url: '/funder/getFunder',
    
    type: 'post',

    handler: (dispatch, getState, formData, resultBody) => {

        // 更新formData
        dispatch({
            type: LIST__UPDATE_FORM_DATA,
            payload: {
                ...formData,
                total: resultBody.total
            }
        })

        // 更新tableData
        dispatch({
            type: LIST__UPDATE_TABLE_DATA,
            payload: {
                dataSource: resultBody.list
            }
        })

        return resultBody
    }
})
