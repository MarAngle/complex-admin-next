import _func, { noticeDataMsgType } from 'complex-func'
import { Modal, ModalProps, notification } from 'ant-design-vue'
import { NotificationArgsProps } from 'ant-design-vue/lib/notification'
import style from '../style/index'
import { objectAny } from '@/modules/complex-func-next/src/ts'

let loginAlert = false

const currentUrl = ''

export const init = function(app: any) {
  _func.setLocalDataPre('complex-admin-')
  _func.installVue(app, {})
  _func.init({
    data: {
      style: {
        color: style
      },
      regExp: {
        // 手机
        mobile: /^1(3|4|5|6|7|8|9)\d{9}$/,
        // 座机
        tel: /^([0-9]{3,4}-)?[0-9]{7,8}$/,
        // 电子邮箱，前缀支持中文，后缀限制2-8位字母
        // eslint-disable-next-line no-useless-escape
        email: /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/,
        // 身份证号
        identity: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
        ip: /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/,
        port: /^((6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])|[0-5]?\d{0,4})$/
      }
    },
    methods: {
      getMockListByDictionary(dictionaryMap: Map<string, objectAny>, page = 1, size = 10) {
        const list: objectAny[] = []
        for (let i = 0; i <size; i++) {
          list.push({})
        }
        for (const ditem of dictionaryMap.values()) {
          for (let i = 0; i < size; i++) {
            const targetItem = list[i]
            let value: string | objectAny = ditem.prop + '/' + page + '/' + i
            if (ditem.getInterface('showprop', 'list')) {
              if (_func.getProp(ditem, 'mod.edit.option.list')!.length > 0) {
                const size = ditem.mod.edit.option.list.length
                const index = _func.getRandomNum(0, size)
                value = ditem.mod.edit.option.list[index].value
              } else {
                value = {
                  value: value,
                  [ditem.getInterface('showprop', 'list')]: value
                }
              }
            }
            targetItem[ditem.prop] = value
          }
        }
        return list
      }
    },
    notice: {
      showMsg: function (content: string, type: noticeDataMsgType = 'info', title = '通知', duration = 3) {
        this.setMsg({
          message: title,
          description: content,
          duration: duration
        }, type)
      },
      setMsg: function (option: NotificationArgsProps, type: noticeDataMsgType = 'info') {
        if (notification[type]) {
          notification[type](option)
        } else {
          console.error('notification type is not defined, type reset open')
          notification.open(option)
        }
      },
      alert: function (content: string, title = '警告', next?: (act:string) => void, okText = '确认') {
        this.setModal({
          title: title,
          content: content,
          okText: okText,
          onOk: function () {
            if (next) {
              next('ok')
            }
          }
        }, 'error')
      },
      confirm: function (content: string, title = '警告', next?: (act:string) => void, okText = '确认', cancelText = '取消') {
        this.setModal({
          title: title,
          content: content,
          okText: okText,
          cancelText: cancelText,
          onCancel: function () {
            if (next) {
              next('cancel')
            }
          },
          onOk: function () {
            if (next) {
              next('ok')
            }
          }
        }, 'confirm')
      },
      setModal: function (option: ModalProps, type = 'info') {
        if (Modal[type]) {
          Modal[type](option)
        } else {
          console.error('modal type is not defined, type reset info')
          Modal.info(option)
        }
      }
    },
    require: {
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
                _func.alert(content, 'TOKEN错误')
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
    }
  })
}

export default _func
