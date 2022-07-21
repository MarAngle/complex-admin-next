import { App } from 'vue'
import { Modal, ModalProps, notification } from 'ant-design-vue'
import { NotificationArgsProps } from 'ant-design-vue/lib/notification'
import $func from 'complex-func'
import { noticeDataMsgType } from 'complex-func/src/option/noticeData'

export const funcInit = function(app: App) {
  $func.setLocalDataPre('complex-admin-')
  // $func.installVue(app, {})
  $func.init({
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
    }
  })

  return app
}


export default $func
