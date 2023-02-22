// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  TestService,
  TestServiceData,
  TestServicePatch,
  TestServiceQuery,
  TestServiceService
} from './test-service.class'

export type { TestService, TestServiceData, TestServicePatch, TestServiceQuery }

export type TestServiceClientService = Pick<
  TestServiceService<Params<TestServiceQuery>>,
  (typeof testServiceMethods)[number]
>

export const testServicePath = 'test-service'

export const testServiceMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const testServiceClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(testServicePath, connection.service(testServicePath), {
    methods: testServiceMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [testServicePath]: TestServiceClientService
  }
}
