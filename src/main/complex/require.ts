import $func from 'complex-func'
import $require from 'complex-require'

export const requireInit = function() {
  let loginAlert = false
  const currentUrl = ''
  $require.$init({
    api: {
      baseURL: currentUrl
    },
    option: {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    },
    rule: [
      {
        name: '基本',
        prop: 'default',
        token: {
          check: true,
          fail: function (tokenname = 'TOKEN') {
            if (!loginAlert) {
              loginAlert = true
              const content = `${tokenname}错误，请重新登录！`
              $func.alert(content, 'TOKEN错误')
            }
          },
          data: {
            // sign: {
            //   require: true,
            //   data: 'sign',
            //   location: 'params'
            // }
          }
        },
        methods: {
          checkUrl(url: string) {
            if (url.indexOf(currentUrl) > -1) {
              return true
            } else {
              return false
            }
          },
          check (response: any) {
            const res: any = {
              status: 'fail'
            }
            if (response.data) {
              res.data = response.data
              if (response.data.result == 'SUCCEED') {
                res.status = 'success'
                res.msg = response.data.errorMessage
              } else if (response.data.result == 'LOGIN') {
                res.status = 'login'
                res.code = response.data.errorCode
                res.msg = response.data.errorMessage
              } else {
                res.code = response.data.errorCode
                res.msg = response.data.errorMessage || '接口请求返回失败且无错误信息！'
              }
            }
            return res
          },
          failMsg (errRes) {
            if (errRes.error.response) {
              if (errRes.error.response.data && errRes.error.response.data.message) {
                // return errRes.error.response.data.message
              }
            }
          }
        }
      }
    ]
  })
}
