import { dbPostgre } from './postgresql.js'

export class ScheduleModel {
  static async getAll () {
    let scheduleListResponse = []
    await dbPostgre.query('SELECT schedule_id, laboratory.name as laboratory, init_time as init, end_time as end, master_table.name as day, course FROM schedule LEFT JOIN laboratory ON schedule.laboratory_id = laboratory.laboratory_id LEFT JOIN master_table ON schedule.day = master_table.value WHERE schedule.status = $1 AND laboratory.state = $1 AND master_table.master_table_idparent = $2 ORDER BY init_time', ['A', '51f87c42-813e-4411-9085-faff71b32f4c'])
      .then((result) => {
        console.log('Resultados de la consulta:', result)
        const oneDay = result.filter(x => x.day === 'lunes')
        const twoDay = result.filter(x => x.day === 'martes')
        const threeDay = result.filter(x => x.day === 'miércoles')
        const fourDay = result.filter(x => x.day === 'jueves')
        const fiveDay = result.filter(x => x.day === 'viernes')
        const sixDay = result.filter(x => x.day === 'sábado')
        const sevenDay = result.filter(x => x.day === 'domingo')

        const weeklyScheduleData = [
          {
            day: 'Lunes',
            labs: oneDay
          },
          {
            day: 'Martes',
            labs: twoDay
          },
          {
            day: 'Miércoles',
            labs: threeDay
          },
          {
            day: 'Jueves',
            labs: fourDay
          },
          {
            day: 'Viernes',
            labs: fiveDay
          },
          {
            day: 'Sábado',
            labs: sixDay
          },
          {
            day: 'Domingo',
            labs: sevenDay
          }
        ]

        scheduleListResponse = weeklyScheduleData
      })
      .catch((error) => {
        console.error('Error al ejecutar la consulta:', error)
        return error
      })
    return scheduleListResponse
  }

  static async create ({ input }) {
    const model = {
      laboratory_id: input.laboratory_id,
      init_time: input.initTime,
      end_time: input.endTime,
      day: input.day,
      course: input.course
    }
    // eslint-disable-next-line no-template-curly-in-string
    await dbPostgre.none('INSERT INTO schedule(${this:name}) VALUES(${this:csv})', model)
      .then(() => { console.log('Registro creado con éxito') })
      .catch((error) => { console.log(`Error al crear el registro: ${error}`) })
  }

  static async update ({ id, input }) {
    const scheduleId = id
    const day = input.day
    const initTime = input.initTime
    const endTime = input.endTime
    const course = input.course
    // eslint-disable-next-line no-template-curly-in-string
    await dbPostgre.none('UPDATE schedule SET day = $1, init_time = $2, end_time = $3, course = $4 WHERE schedule_id = $5',
      [day, initTime, endTime, course, scheduleId])
      .then(() => { console.log('Registro actualizado con éxito') })
      .catch((error) => { console.error('Error al actualizar el registro:', error) })
  }

  static async delete ({ id }) {
    // eslint-disable-next-line no-template-curly-in-string
    await dbPostgre.none('UPDATE schedule SET status = $1 WHERE schedule_id = $2', ['I', id])
      .then(() => { console.log('Registro eliminado con éxito') })
      .catch((error) => { console.error('Error al eliminar el registro:', error) })
  }
}
