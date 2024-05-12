/* callEntry */
import { reactive } from 'vue'
import { deepCopy } from 'loash-es'

export const useRenderless = ({ props }) => {
  const state = reactive({
    tableData: props.data || props.op.data || []
  })

  const logMessage = () => {
    const t = '123'
    console.log('我是纯函数我不需要闭包参数')
    function aaa () {
      const tttt = '23434'
    }
  }

  const aaa = 123

  const handleClick = (e) => {
    console.log(e.target)
    state.tableData.push({
      key: 'TinyEngine',
      zhCN: '低代码引擎',
      enUS: 'TinyEngine'
    })
  }

  const bbb = 321

  const sendMessage = () => {
    logMessage('自定义是的范德萨')
  }

  function ttt () {
    logMessage('自定义是的范德萨')
  }

  return {
    state,
    handleClick,
    sendMessage
  }
}