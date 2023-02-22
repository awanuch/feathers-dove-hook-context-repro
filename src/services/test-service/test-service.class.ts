// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#custom-services
import type { Id, NullableId, Params, ServiceInterface } from '@feathersjs/feathers'

import type { Application } from '../../declarations'
import type { TestService, TestServiceData, TestServicePatch, TestServiceQuery } from './test-service.schema'

export type { TestService, TestServiceData, TestServicePatch, TestServiceQuery }

export interface TestServiceServiceOptions {
  app: Application
}

export interface TestServiceParams extends Params<TestServiceQuery> {}

// This is a skeleton for a custom service class. Remove or add the methods you need here
export class TestServiceService<ServiceParams extends TestServiceParams = TestServiceParams>
  implements ServiceInterface<TestService, TestServiceData, ServiceParams, TestServicePatch>
{
  constructor(public options: TestServiceServiceOptions) {}

  async find(_params?: ServiceParams): Promise<TestService[]> {
    return []
  }

  async get(id: Id, _params?: ServiceParams): Promise<TestService> {
    return {
      id: 0,
      text: `A new message with ID: ${id}!`
    }
  }

  async create(data: TestServiceData, params?: ServiceParams): Promise<TestService>
  async create(data: TestServiceData[], params?: ServiceParams): Promise<TestService[]>
  async create(
    data: TestServiceData | TestServiceData[],
    params?: ServiceParams
  ): Promise<TestService | TestService[]> {
    if (Array.isArray(data)) {
      return Promise.all(data.map((current) => this.create(current, params)))
    }

    return {
      id: 0,
      ...data
    }
  }

  // This method has to be added to the 'methods' option to make it available to clients
  async update(id: NullableId, data: TestServiceData, _params?: ServiceParams): Promise<TestService> {
    return {
      id: 0,
      ...data
    }
  }

  async patch(id: NullableId, data: TestServicePatch, _params?: ServiceParams): Promise<TestService> {
    return {
      id: 0,
      text: `Fallback for ${id}`,
      ...data
    }
  }

  async remove(id: NullableId, _params?: ServiceParams): Promise<TestService> {
    return {
      id: 0,
      text: 'removed'
    }
  }
}

export const getOptions = (app: Application) => {
  return { app }
}
