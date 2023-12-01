import z from 'zod'

const scheduleSchema = z.object({
  laboratory_id: z.string(),
  day: z.string({
    invalid_type_error: 'Schedule day must be a string',
    required_error: 'Schedule day is required.'
  }),
  initTime: z.string({
    invalid_type_error: 'Schedule init_time must be a string',
    required_error: 'Schedule init_time is required.'
  }),
  endTime: z.string({
    invalid_type_error: 'Schedule end_time must be a string',
    required_error: 'Schedule end_time is required.'
  }),
  course: z.string({
    invalid_type_error: 'Schedule course must be a string',
    required_error: 'Schedule course is required.'
  })
})

export function validateSchedule (input) {
  return scheduleSchema.safeParse(input)
}

export function validatePartialSchedule (input) {
  return scheduleSchema.partial().safeParse(input)
}
