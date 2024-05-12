import { parse } from '@babel/parser'
import generate from '@babel/generator'
import traverse from '@babel/traverse'
import template from '@babel/template'
import {
  getEntryParam,
  wrapEntryFuncNode,
  COMMON_PACKAGE_NAME,
  CALLENTRY,
  BEFORE_CALLENTRY,
  AFTER_CALLENTRY,
  isCallEntryFile,
  isHasGetCurrentInstance,
  getMeataPath
} from './utils.js'


const generateTraverse = traverse.default


export const transform = (code, id) => {
  // 如果不包含callEntry的文字直接退出
  if (!isCallEntryFile(code)) {
    return
  }

  // 本次转换保存的状态
  const state = {
    varDeclartion: new Map()
  }

  // 找不到meta.js告警并返回
  const metaPath = getMeataPath(id)
  if (!metaPath) {
    console.log('找不到对应的meta.js')
    return
  }

  // 将源码解析为ast语法数
  const resultAst = parse(code, {
    sourceType: 'module',
    plugins: ['typescript', 'jsx']
  })

  generateTraverse(resultAst, {
    // 使用特定的类型回调处理、函数表达式、箭头函数、带导出的函数
    'ArrowFunctionExpression|FunctionExpression'(path) {
      const parentNode = path.parentPath || {}
      const functionName = parentNode.node?.id?.name

      // 只有拿到函数的名称才可以被复写
      if (functionName) {
        
        const allBindings = path.scope.getAllBindings()
        const selfBindings = path.scope.bindings
        const varDeclartion = state.varDeclartion
        console.log(allBindings.aaa.value)
        debugger
        wrapEntryFuncNode({ path, functionName, metaDataName: state.metaDataName, getInstanceName: state.getInstanceName })
      }
    },
    VariableDeclaration(path) {
      const name = path.node.declarations[0].id.name
      const block = path.scope.block 
      if (!state.varDeclartion.has(block)) {
        const arr = [name]
        state.varDeclartion.set(block, arr)
      } else {
        const arr = state.varDeclartion.get(block)
        arr.push(name)
      }
    },
    Program(path) {
      const code = path.toString()
      if (!code.includes(COMMON_PACKAGE_NAME)) {
        path.node.body.unshift(
          template.statement(
            `import { ${CALLENTRY},${BEFORE_CALLENTRY},${AFTER_CALLENTRY} } from '${COMMON_PACKAGE_NAME}'`
          )()
        )
      }

      const getInstanceName = path.scope.generateUid('getCurrentInstance')
      state.getInstanceName = getInstanceName
        path.node.body.unshift(
          template.statement(`import { getCurrentInstance as ${getInstanceName} } from 'vue'`)()
        )

 
        const metaDataName = path.scope.generateUid('metaData')
        state.metaDataName = metaDataName
        path.node.body.unshift(
          template.statement(`import ${metaDataName} from '${metaPath}'`)()
        )
      
    }
  })

  return generate.default(resultAst).code || ''
}