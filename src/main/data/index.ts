
import style from '../style/index'
import { getProp, getRandomNum } from 'complex-utils'

const $data = {
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
  formatLocal(item: Record<PropertyKey, any>) {
    item.id = 1
    return item
  },
  getMockListByDictionary(dictionaryMap: Map<string, Record<PropertyKey, any>>, page = 1, size = 10) {
    const list: Record<PropertyKey, any>[] = []
    for (let i = 0; i <size; i++) {
      list.push({})
    }
    for (const ditem of dictionaryMap.values()) {
      for (let i = 0; i < size; i++) {
        const targetItem = list[i]
        let value: string | Record<PropertyKey, any> = ditem.prop + '/' + page + '/' + i
        if (ditem.getInterface('showprop', 'list')) {
          if (getProp(ditem, 'mod.edit.option.list')!.length > 0) {
            const size = ditem.mod.edit.option.list.length
            const index = getRandomNum(0, size)
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
}

export default $data
