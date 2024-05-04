import template from '@babel/template'

export const CALLENTRY = 'callEntry'
export const BEFORE_CALLENTRY = 'beforeCallEntry'
export const AFTER_CALLENTRY = 'afterCallEntry'
export const COMMON_PACKAGE_NAME = '@opentiny/tiny-engine-common'
const callEntryExp = /\/\*\s*callEntry/

export const isCallEntryFile = (code) => {
  return callEntryExp.test(code)
}

// 将注释中的参数提取出来，并组合成目前参数格式
export const getEntryParam = (functionName = '', utils) => {
  if (functionName) {
    return `{ metaData: { id: \`\${metaData.id}.${functionName}\` }, instance: getCurrentInstance(), utils: {${Object.keys(
      utils
    ).join(',')}} }`
  }

  return '{ metaData }'
}

const getParentVariableDeclaration = (path) => {
  if (!path) {
    return
  }

  if (
    path.type === 'VariableDeclaration' &&
    path.parentPath.type !== 'ExportNamedDeclaration'
  ) {
    return path
  } else {
    return getParentVariableDeclaration(path?.parentPath)
  }
}

const generateBeforeAfterEntry = ({ path, beforeEntryAst, afterEntryAst }) => {
  const parent = getParentVariableDeclaration(path)
  if (parent) {
    parent.insertBefore(beforeEntryAst)
    parent.insertAfter(afterEntryAst)
  }
}

const getOuterBingdings = (path) => {
  const outerBindings = {}
  const allBindings = path.scope.getAllBindings()
  const selfBindings = path.scope.bindings
  Object.keys(allBindings).forEach((key) => {
    if (allBindings[key] && !selfBindings[key]) {
      outerBindings[key] = allBindings[key]
    }
  })
  return outerBindings
}

// 生成callEntry表达式并包裹当前函数，如果有参与还需要处理参数
export const wrapEntryFuncNode = ({ path, functionName }) => {
  const utils = getOuterBingdings(path)
  const entryParam = getEntryParam(functionName, utils)
  const entryAst = template.statement(`${CALLENTRY}(${entryParam})`)()
  const beforeEntryAst = template.statement(
    `${BEFORE_CALLENTRY}(${entryParam})`
  )()
  const afterEntryAst = template.statement(
    `${AFTER_CALLENTRY}(${entryParam})`
  )()

  const resultNode = path.node
  generateBeforeAfterEntry({ path, beforeEntryAst, afterEntryAst })

  entryAst.expression.arguments.unshift(JSON.parse(JSON.stringify(resultNode)))
  // 替换整个节点
  path.replaceWith(entryAst)
}

export const isHasGetCurrentInstance = (specifiers) => {
  return specifiers.some((item) => {
    return item.imported.name === 'getCurrentInstance'
  })
}