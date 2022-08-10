import $func from "complex-func"
import { ListData } from "@/modules/complex-data";

//* 考虑通过多接口实现统一管理 */
interface mainDataType<DATA extends object> extends ListData<DATA>{
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
          prop: 'name',
          mod: {
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
      console.log($func, this)
      console.log(this.$getParent())
    }
  }
}) as mainDataType<dataType>

// mainData.$getData()


console.log(mainData)

export default mainData

