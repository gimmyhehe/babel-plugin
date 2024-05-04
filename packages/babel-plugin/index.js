import { transform } from './src/transform.js'
import { transformSFC } from './src/transform-sfc.js'

export default function () {
  return {
    name: 'vite-plugin-generate-comments',
    enforce: 'pre',
    transform(code, id) {
      if (id.endsWith('.vue')) {
        const result = transformSFC(code)
        return result
      }

      if (id.endsWith('.js') || id.endsWith('.jsx') || id.endsWith('.ts')) {
        const result = transform(code)
        return result
      }
    }
  }
}