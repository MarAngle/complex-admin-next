import { Button } from "ant-design-vue"
import { ComplexList } from "complex-data-next"
import { h } from "vue"

interface dataType {
  id: number,
  input: string
}

const mainData = new ComplexList({
  name: '测试',
  prop: 'test',
  extra: {
    a: 1
  },
  module: {
    dictionary: {
      option: {},
      list: [
        {
          prop: '$index',
          name: 'No',
          originFrom: 'local'
        },
        {
          prop: 'id',
          name: 'ID',
          originFrom: 'list',
          format(data, payload) {
            return 'id' + data
          },
          mod: {
            list: {}
          }
        },
        {
          prop: 'input',
          name: '输入框',
          originFrom: 'list',
          mod: {
            list: {},
            edit: {
              type: 'input',
              option: {
                maxLength: 40
              }
            },
            build: {
              $target: 'edit'
            },
            change: {
              $target: 'edit'
            }
          }
        },
        {
          prop: 'inputNumber',
          name: '数字',
          originFrom: 'list',
          mod: {
            list: {},
            edit: {
              type: 'inputNumber',
              option: {
                max: 100,
                min: 0,
                step: 2,
                precision: 0
              }
            },
            build: {
              $target: 'edit'
            },
            change: {
              $target: 'edit'
            }
          }
        },
        {
          prop: 'select',
          name: '选项',
          originFrom: 'list',
          mod: {
            list: {},
            edit: {
              type: 'select',
              required: true,
              placeholder: '这里是自定义的文字',
              tip: '这是自定义的提示',
              option: {
                list: [
                  {
                    value: 1,
                    label: '111'
                  },
                  {
                    value: 2,
                    label: '222'
                  },
                ]
              }
            },
            build: {
              $target: 'edit'
            },
            change: {
              $target: 'edit'
            }
          }
        },
        {
          prop: 'button',
          name: '按钮',
          originFrom: 'local',
          mod: {
            list: {},
            edit: {
              type: 'button',
              option: {
                name: 'xxx'
              }
            },
            build: {
              $target: 'edit'
            },
            change: {
              $target: 'edit'
            }
          }
        },
        {
          prop: 'object',
          name: '对象',
          originFrom: 'list',
          format(data: any) {
            data.e = 'e'
            data.name += 'e'
            return data
          },
          dictionary: {
            list: [
              {
                prop: 'name',
                name: '名称',
                originFrom: 'list',
                format(data) {
                  return 'name' + data
                }
              }
            ]
          },
          mod: {
            list: {}
          }
        },
        {
          prop: 'menu',
          name: '操作',
          originFrom: 'local',
          mod: {
            list: {
              render() {
                return h(Button, {}, '操作')
              }
            }
          }
        }
      ]
    }
  },
  $getData(this: ComplexList) {
    return new Promise((resolve) => {
      const olist: dataType[] = []
      for (let i = 0; i < 10; i++) {
        const item = {
          id: i,
          input: 'name' + i,
          select: 1,
          object: {
            name: i
          },
          extra: i
        }
        olist.push(item)
      }
      this.$formatList(olist, 150)
      resolve({ status: 'success' })
    })
  },
})

mainData.$loadData()

console.log(mainData)

export default mainData

