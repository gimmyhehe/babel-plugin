/* callEntry */
import { reactive } from 'vue'
import { deepCopy } from 'loash-es'

export const useRenderless = ({ props }) => {
  const state = reactive({
    tableData: props.data || props.op.data || []
  })

  const logMessage = () => {
    console.log('我是纯函数我不需要闭包参数')
  }

  const handleClick = (e) => {
    console.log(e.target)
    state.tableData.push({
      key: 'TinyEngine',
      zhCN: '低代码引擎',
      enUS: 'TinyEngine'
    })
  }

  const sendMessage = () => {
    logMessage('自定义是的范德萨')
  }

  return {
    state,
    handleClick,
    sendMessage
  }
}