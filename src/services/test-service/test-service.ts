// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  testServiceDataValidator,
  testServicePatchValidator,
  testServiceQueryValidator,
  testServiceResolver,
  testServiceExternalResolver,
  testServiceDataResolver,
  testServicePatchResolver,
  testServiceQueryResolver
} from './test-service.schema'

import type { Application } from '../../declarations'
import { TestServiceService, getOptions } from './test-service.class'
import { testServicePath, testServiceMethods } from './test-service.shared'

export * from './test-service.class'
export * from './test-service.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const testService = (app: Application) => {
  // Register our service on the Feathers application
  app.use(testServicePath, new TestServiceService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: testServiceMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(testServicePath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(testServiceExternalResolver),
        schemaHooks.resolveResult(testServiceResolver)
      ]
    },
    before: {
      all: [
        (ctx) => {
          console.log(ctx.toJSON())
          return ctx
        },
        schemaHooks.validateQuery(testServiceQueryValidator),
        schemaHooks.resolveQuery(testServiceQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(testServiceDataValidator),
        schemaHooks.resolveData(testServiceDataResolver)
      ],
      patch: [
        schemaHooks.validateData(testServicePatchValidator),
        schemaHooks.resolveData(testServicePatchResolver)
      ],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [testServicePath]: TestServiceService
  }
}
