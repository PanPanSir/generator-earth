import request from 'ROOT_SOURCE/utils/request'
import { CURRENT_PAGE, PAGE_SIZE } from './BaseConfig'



function createUpdateTable({
    url='',
    handler=()=>{},
}) {
    return function (/*formData|pagination*/options={}) {
        return async (dispatch, getState) => {
            
            // 初始化antd-table-pagination
            let formData = Object.assign(
                {[PAGE_SIZE]: 10, [CURRENT_PAGE]: 1},
                options,
            )
            
            // 请求server数据
            let result = await request.post(url, {...formData})
            
            if (!result || !result.data) return;
            
            return handler(dispatch, getState, formData, result.data)
        }
    }
}



function createNormalQuery({
    url='',
    handler=()=>{},
}) {
    return function (options={}) {
        return async (dispatch, getState) => {
            
            // 请求server数据
            let result = await request.get(url, {...options})
            
            if (!result || !result.data) return;
            
            return handler(dispatch, getState, result.data)
        }
    }
}



function createNormalSubmit({
    url='',
    handler=()=>{},
}) {
    return function (options={}) {
        return async (dispatch, getState) => {
            
            // 请求server数据
            let result = await request.post(url, {...options})
            
            if (!result || !result.data) return;
            
            return handler(dispatch, getState, result.data)
        }
    }
}



export default {
    createUpdateTable,
    createNormalQuery,
    createNormalSubmit,
}
