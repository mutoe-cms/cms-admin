import { CodeGenerator, Interface } from '@mutoe/pont-engine'

export default class MyGenerator extends CodeGenerator {
  getDeclaration() {
    return `
      ${this.getBaseClassesInDeclaration()}
    `
  }

  getIndex() {
    return `
      import * as defs from './baseClass'
      import * as Hooks from './hooks'
      import { API } from './mods/'
      import { PontCore } from './pontCore'
      
      export { defs, API, Hooks, PontCore }
    `
  }

  getModsIndex() {
    function reviseModName(modName: string) {
      // .replace(/\//g, '.').replace(/^\./, '').replace(/\./g, '_') 转换 / .为下划线
      // exp: /api/v1/users  => api_v1_users
      // exp: api.v1.users => api_v1_users
      return modName
        .replace(/\//g, '.')
        .replace(/^\./, '')
        .replace(/\./g, '_')
    }

    return `
      ${this.dataSource.mods.map(mod => {
      const modName = reviseModName(mod.name)
      return `import * as ${modName} from './${modName}';`
    }).join('\n')}

      export const API = {
        ${this.dataSource.mods.map(mod => reviseModName(mod.name)).join(', \n')}
      };
    `
  }

  getInterfaceContentInDeclaration(): string {
    return ''
  }

  getInterfaceContent(inter: Interface): string {
    const method = inter.method.toUpperCase()

    const bodyParamsCode = inter.getBodyParamsCode()
    const responseType = inter.responseType

    let paramsCode = inter.getParamsCode('Params', this.surrounding)
      .replace(/class/, 'interface')
    const isEmptyParams = paramsCode.replace(/\s/g, '') === 'interfaceParams{}'
    if (isEmptyParams) {
      paramsCode = ''
    }

    const requestArgs = []
    paramsCode && requestArgs.push('params: Params')
    bodyParamsCode && requestArgs.push(`data: ${bodyParamsCode}`)
    requestArgs.push('axiosOption: AxiosRequestConfig  = {}')
    const requestParams: string = requestArgs.join(', ')

    const injectPathVariableArgs = []
    injectPathVariableArgs.push('path')
    paramsCode && injectPathVariableArgs.push('params')
    const injectPathVariableParams = injectPathVariableArgs.join(', ')

    const hooksCodes: string[] = []

    switch (method) {
      case 'GET': {
        hooksCodes.push(`
          export function useRetrieveList <T = any>(axiosOption: AxiosRequestConfig = {}) {
            return Hooks.useRetrieveList<T${paramsCode && ', Params'}>(path, axiosOption)
          }
        `)
        break
      }
      case 'POST':
      case 'PUT':
      case 'PATCH': {
        hooksCodes.push(`
          export function useSubmit(formRef: FormRef = null ${paramsCode && ', params: Params'}) {
            return Hooks.useSubmit<${bodyParamsCode}, ${responseType}>(formRef, method, path ${paramsCode && ', params'})
          }
        `)
        break
      }
    }

    return `
      /**
       * @desc ${inter.description}
       */

      import { AxiosRequestConfig, Method } from 'axios'
      import { FormRef } from 'src/components/FormRenderer'
      import { defs, Hooks, PontCore } from 'src/services'

      export const method: Method = "${method}"
      export const path = "${inter.path}"

      ${paramsCode}

      ${hooksCodes.join('\n')}

      export function request(${requestParams}): Promise<${responseType}> {
        return PontCore.fetch({
          url: PontCore.injectPathVariables(${injectPathVariableParams}),
          method,
          ${bodyParamsCode ? 'data,' : ''}
          ...axiosOption,
        });
      }
    `
  }
}
