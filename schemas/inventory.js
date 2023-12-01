import z from 'zod'

const inventorySchema = z.object({
  name: z.string({
    invalid_type_error: 'Laboratory name must be a string',
    required_error: 'Laboratory name is required.'
  }),
  laboratory_id: z.string(),
  code: z.string({
    invalid_type_error: 'Laboratory name must be a string',
    required_error: 'Laboratory name is required.'
  }),
  description: z.string({
    invalid_type_error: 'Laboratory name must be a string',
    required_error: 'Laboratory name is required.'
  })
})

export function validateInventory (input) {
  return inventorySchema.safeParse(input)
}

export function validatePartialInventory (input) {
  return inventorySchema.partial().safeParse(input)
}
