import $func from "@/main/func"
import { SimpleData } from "complex-data";


interface mainDataType extends SimpleData{
  $getData: (this: SimpleData) => void
}

const mainData = new SimpleData({
  name: '测试',
  prop: 'test',
  extra: {
    a: 1
  },
  func: {},
  methods: {
    $getData(this: mainDataType) {
      console.log($func, this)
      console.log(this.$getParent())
    }
  }
}) as mainDataType

mainData.$getData()


export default mainData

