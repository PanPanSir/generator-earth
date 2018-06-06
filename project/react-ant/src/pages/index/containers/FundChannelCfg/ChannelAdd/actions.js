import ActionFactory from 'ROOT_SOURCE/base/ActionFactory'
import { MOD_PREFIX } from '../constants'


export const ADD__LIST__UPDATE_FORM_DATA
    = `${MOD_PREFIX}__ADD__LIST__UPDATE_FORM_DATA`

export const ADD__LIST__UPDATE_TABLE_DATA
  = `${MOD_PREFIX}__ADD__LIST__UPDATE_TABLE_DATA`



export const updateTable = ActionFactory.createUpdateTable({

  // url: '/assetFunderRel/getAssetFunderRel',

  handler: (dispatch, getState, formData, resultBody) => {
    // 更新formData
    dispatch({
      type: ADD__LIST__UPDATE_FORM_DATA,
      payload: {
        ...formData,
        total: resultBody.total,
      }
    })
    // 更新tableData
    dispatch({
      type: ADD__LIST__UPDATE_TABLE_DATA,
      payload: {
        dataSource: resultBody.list,
      }
    })
  },

})

