import { ComplexList } from "complex-data-next"

interface dataType {
  id: number,
  name: string
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
          prop: 'name',
          name: '名称',
          originFrom: 'list',
          mod: {
            list: {},
            edit: {
              type: 'input'
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
          name: 'name' + 'name' + 'name' + 'name' + i,
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

