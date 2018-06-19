import request from 'ROOT_SOURCE/utils/request'
import { CURRENT_PAGE, PAGE_SIZE, RESPONSE_DESTRUST_KEY } from './BaseConfig'

/**
 * author: jiajianrong
 * reducerFactory：创建普通actionCreator
 */




/**
 * 创建普通http request 的actionCreator
 * 
 * @param {String} url
 * @param {String} type
 * @param {Function} handler
 * 
 */
function createRequest({
    url='',
    type='get',
    handler=()=>{},
}) {
    return function (options={}) {
        return async (dispatch, getState) => {
            
            // 请求server数据
            let result = await request[type](url, options)
            
            if (!result) { return; }
            
            return handler(dispatch, getState, result[RESPONSE_DESTRUST_KEY])
        }
    }
}



/**
 * 创建提交表单以及分页时 更新table 所使用的actionCreator
 * 
 * @param {String} url
 * @param {String} type
 * @param {Function} handler
 * 
 */
function createUpdateTable({
    url='',
    type='get',
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
            let result = await request[type](url, formData)
            
            if (!result) { return; }
            
            return handler(dispatch, getState, formData, result[RESPONSE_DESTRUST_KEY])
        }
    }
}



export default {
    createRequest,
    createUpdateTable,
}
