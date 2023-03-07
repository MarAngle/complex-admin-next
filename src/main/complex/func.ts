import { App } from 'vue'
import { Modal, ModalProps, notification } from 'ant-design-vue'
import { NotificationArgsProps } from 'ant-design-vue/lib/notification'
import { install } from 'complex-func'
import { setLocalProp } from 'complex-utils'
import { noticeMsgType } from 'complex-func/src/notice'

export const funcInit = function(app: App) {
  install({
    notice: {
      showMsg: function (content: string, type: noticeMsgType = 'info', title = '通知', duration = 3) {
        this.setMsg({
          message: title,
          description: content,
          duration: duration
        }, type)
      },
      setMsg: function (option: NotificationArgsProps, type: noticeMsgType = 'info') {
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
    }

  })
  setLocalProp('complex-admin-')
  return app
}
