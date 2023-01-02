import request from '@/utils/request'

const MANAGEURL = 'user-manage'

/**
 * 获取用户列表数据
 */
export const getUserManageList = (data) => {
  return request({
    url: `/${MANAGEURL}/list`,
    params: data
  })
}

/**
* 批量导入
*/
export const userBatchImport = (data) => {
  return request({
    url: `/${MANAGEURL}/batch/import`,
    method: 'POST',
    data
  })
}
