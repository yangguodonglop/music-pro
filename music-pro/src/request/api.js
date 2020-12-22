import {get,post} from './http'
const baseUrl='http://106.53.61.91:8990'
const baseApi = {
    Login: '/signIn',
    Logout: '/auth/logout',
    ForgePassword: '/auth/forge-password',
    Register: '/auth/register',
    twoStepCode: '/auth/2step-code',
    SendSms: '/account/sms',
    SendSmsErr: '/account/sms_err',
    // get my info
    UserInfo: '/user/info',
    UserMenu: '/user/nav',
    MeberList:'http://apis.juhe.cn/lottery/types'
  }
  
  /**
   * login func
   * parameter: {
   *     username: '',
   *     password: '',
   *     remember_me: true,
   *     captcha: '12345'
   * }
   * @param parameter
   * @returns {*}
   */
  
  // export function apiAddress (parameter) {
  //   return request({
  //     url: baseUrl+baseApi,
  //     method: 'post',
  //     data: parameter
  //   })
  // }

export const apiAddress = param => post('https://api.apiopen.top/getJoke?page=1&count=2&type=video', param)
export const apiLogin = param => post(baseUrl+'/signIn', param)
export const apiUserList = param => post(baseUrl+'/getAllUserName', param)
export const apiRegistered = param => post(baseUrl+'/signUp', param)
export const apiDeleteList = param => post(baseUrl+'/delAccount', param)
export const apiEditList = param => post(baseUrl+'/rewriteInfo', param)
export const apiAuthorizationList = param => post(baseUrl+'/authorization', param)
export const apiUserNameList = param => post(baseUrl+'/getUserName', param)
