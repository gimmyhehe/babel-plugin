import template from '@babel/template'
import path from 'node:path'
import fs from 'node:fs'

export const CALLENTRY = 'callEntry'
export const BEFORE_CALLENTRY = 'beforeCallEntry'
export const AFTER_CALLENTRY = 'afterCallEntry'
export const COMMON_PACKAGE_NAME = '@opentiny/tiny-engine-common'
const callEntryExp = /\/\*\s*callEntry/

export const isCallEntryFile = (code) => {
  return callEntryExp.test(code)
}

// 将注释中的参数提取出来，并组合成目前参数格式
export const getEntryParam = ({ functionName = '', utils, metaDataName, getInstanceName }) => {
  if (functionName && functionName!== 'useRenderless') {
    return `{ ${metaDataName}: { id: \`\${${metaDataName}.id}.${functionName}\` }, instance: ${getInstanceName}(), utils: {${Object.keys(
      utils
    ).join(',')}} }`
  }

  return `{ ${metaDataName} }`
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

export const getOuterBingdings = (path) => {
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

export const getModuleBindings = (path) => {
  const moduleBindings = {}
  const allBindings = path.scope.getAllBindings()
  Object.keys(allBindings).forEach((key) => {
    if (allBindings[key].kind === 'module') {
      moduleBindings[key] = allBindings[key]
    }
  })
  return moduleBindings
}

// 生成callEntry表达式并包裹当前函数，如果有参与还需要处理参数
export const wrapEntryFuncNode = ({ path, functionName, metaDataName, getInstanceName }) => {
  const utils = getOuterBingdings(path)
  const entryParam = getEntryParam({functionName, utils, metaDataName, getInstanceName})
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

// 获取两个文件路径的相对路径，入参为两个文件绝对路径
export const getRelFilePath = (path1, path2) => {
  const dir1 = path.join(path1, '..')
  const dir2 = path.join(path2, '..')
  const relPath = path.relative(dir1, dir2) || '.'
  return `${relPath}/${path.basename(path2)}`.replaceAll('\\', '/')
}

// 向上获取meta.js的相对路径
export const getMeataPath = (id) => {
  let tempPath = path.join(id, '../meta.js')

  const endCondition = () => {
    // 找到了meta.js
    const findMeta = fs.existsSync(tempPath)
    // 发现了package.json说明到达子包根目录
    const isSubRoot = fs.existsSync(path.join(tempPath, '../package.json'))
    // 到达系统根节点，防止死循环
    const isRoot = tempPath === path.join(tempPath, '../../meta.js')
    return findMeta || isSubRoot || isRoot
  }

  while (!endCondition()) {
    tempPath = path.join(tempPath, '../../meta.js')
  }
  if (fs.existsSync(tempPath)) {
    return getRelFilePath(id, tempPath)
  }
  return null
}