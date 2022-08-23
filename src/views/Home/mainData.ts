import $func from "complex-func"
import { ListData } from "complex-data";
import { objectAny } from "complex-data/ts";

//* 考虑通过多接口实现统一管理 */
export interface mainDataType<DATA extends object> extends ListData<DATA>{
  $getData: (this: ListData<DATA>) => Promise<any>
}

interface dataType {
  id: number,
  name: string
}

const mainData = new ListData({
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
          mod: {
            list: {}
          }
        },
        {
          prop: 'id',
          name: 'ID',
          mod: {
            list: {},
            edit: {
              type: 'input'
            }
          }
        },
        {
          prop: 'name',
          name: '名称',
          mod: {
            list: {},
            edit: {
              type: 'input'
            }
          }
        }
      ]
    }
  },
  func: {},
  methods: {
    $getData(this: mainDataType<dataType>) {
      return new Promise((resolve) => {
        const list: dataType[] = []
        for (let i = 0; i < 10; i++) {
          const item = {
            id: i,
            name: 'name' + 'name' + 'name' + 'name' + i
          }
          list.push(item)
        }
        this.$formatData(list)
        resolve({ status: 'success' })
      })
    }
  }
}) as mainDataType<dataType>

mainData.$loadData()

console.log(mainData)

export default mainData

