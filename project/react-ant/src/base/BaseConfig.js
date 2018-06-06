/*
 * ant-d的pagination使用`pageSize`和`current`代表每页记录条数和当前页码，使用`total`代表所有记录条数
 * 而我们和rd之间的约定则是`[PAGE_SIZE]`和`[CURRENT_PAGE]`代表每页记录条数和当前页码
 * 
 * 因此组件初始化时，将 this.state.pagination 设置为 [PAGE_SIZE]=10, [CURRENT_PAGE]=1
 * 首次发送请求时 [PAGE_SIZE]=10, [CURRENT_PAGE]=1
 * 
 * 接收rd返回数据时，将pagination.total设置为具体值(这里为result.data.total)
 * 
 * 翻页时，更新this.state.pagination的page: antd.table的onChange函数会把pagination传出来
 * 
 */

export const CURRENT_PAGE = 'pageNo'
export const PAGE_SIZE = 'pageSize'
export const TOTAL = 'total'


