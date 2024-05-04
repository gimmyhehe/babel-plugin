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
  isHasGetCurrentInstance
} from './utils.js'

const generateTraverse = traverse.default

export const transform = (code) => {
  // 如果不包含callEntry的文字直接退出
  if (!isCallEntryFile(code)) {
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
        wrapEntryFuncNode({ path, functionName })
      }
    },
    ImportDeclaration(path) {
      const source = path.node?.source?.value
      if (
        source === 'vue' &&
        path.node.specifiers &&
        !isHasGetCurrentInstance(path.node.specifiers)
      ) {
        const ast = template.statement(
          `import { getCurrentInstance } from 'vue'`
        )()
        path.node.specifiers.push(...ast.specifiers)
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

      // 如果没有引入vue则自动添加vue依赖
      if (!/from ['"]vue['"]/.test(code)) {
        path.node.body.unshift(
          template.statement(`import { getCurrentInstance } from 'vue'`)()
        )
      }

      if (!code.includes('/meta')) {
        path.node.body.unshift(
          template.statement(`import metaData from '../meta.js'`)()
        )
      }
    }
  })

  return generate.default(resultAst).code || ''
}