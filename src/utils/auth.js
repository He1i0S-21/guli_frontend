/*
 * @Author: isoysterg 1019096274@qq.com
 * @Date: 2022-11-09 11:34:52
 * @LastEditors: isoysterg 1019096274@qq.com
 * @LastEditTime: 2023-02-06 19:37:45
 * @FilePath: \VueWithCli\edu_front\src\utils\auth.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}
