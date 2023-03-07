import BaseData from "@/modules/complex-data/src/data/BaseData"



interface dataType {
  id: number,
  name: string
}

const mainData = new BaseData({
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
        },
        {
          prop: 'id',
          name: 'ID',
        },
        {
          prop: 'name',
          name: '名称',
        }
      ]
    }
  },
  $getData(this: BaseData) {
    return new Promise((resolve) => {
      const list: dataType[] = []
      for (let i = 0; i < 10; i++) {
        const item = {
          id: i,
          name: 'name' + 'name' + 'name' + 'name' + i
        }
        list.push(item)
      }
      this.$module.dictionary!.formatListData(list)
      resolve({ status: 'success' })
    })
  },
})

mainData.$loadData()

console.log(mainData)

export default mainData

