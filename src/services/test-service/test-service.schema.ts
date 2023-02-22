// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const testServiceSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'TestService', additionalProperties: false }
)
export type TestService = Static<typeof testServiceSchema>
export const testServiceValidator = getValidator(testServiceSchema, dataValidator)
export const testServiceResolver = resolve<TestService, HookContext>({})

export const testServiceExternalResolver = resolve<TestService, HookContext>({})

// Schema for creating new entries
export const testServiceDataSchema = Type.Pick(testServiceSchema, ['text'], {
  $id: 'TestServiceData'
})
export type TestServiceData = Static<typeof testServiceDataSchema>
export const testServiceDataValidator = getValidator(testServiceDataSchema, dataValidator)
export const testServiceDataResolver = resolve<TestService, HookContext>({})

// Schema for updating existing entries
export const testServicePatchSchema = Type.Partial(testServiceSchema, {
  $id: 'TestServicePatch'
})
export type TestServicePatch = Static<typeof testServicePatchSchema>
export const testServicePatchValidator = getValidator(testServicePatchSchema, dataValidator)
export const testServicePatchResolver = resolve<TestService, HookContext>({})

// Schema for allowed query properties
export const testServiceQueryProperties = Type.Pick(testServiceSchema, ['id', 'text'])
export const testServiceQuerySchema = Type.Intersect(
  [
    querySyntax(testServiceQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type TestServiceQuery = Static<typeof testServiceQuerySchema>
export const testServiceQueryValidator = getValidator(testServiceQuerySchema, queryValidator)
export const testServiceQueryResolver = resolve<TestServiceQuery, HookContext>({})
