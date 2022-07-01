import $func from "@/main/func"
import { SimpleData } from "complex-data";

const mainData = new SimpleData({
  name: '测试',
  prop: 'test',
  extra: {},
  func: {},
  methods: {
    $getData() {
      console.log($func)
    }
  }
})

const a = $func.deepClone(mainData, true)

console.log(a)

export default mainData

