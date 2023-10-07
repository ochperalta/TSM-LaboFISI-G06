// import { randomUUID } from 'node:crypto'
import { readJSON } from '../../utils.js'

const laboratories = readJSON('./laboratories.json')

export class LaboratoryModel {
  static async getAll () {
    return laboratories
  }

  // static async getById ({ id }) {
  //   const movie = movies.find(movie => movie.id === id)
  //   return movie
  // }

  // static async create ({ input }) {
  //   const newMovie = {
  //     id: randomUUID(),
  //     ...input
  //   }

  //   movies.push(newMovie)

  //   return newMovie
  // }

  // static async delete ({ id }) {
  //   const movieIndex = movies.findIndex(movie => movie.id === id)
  //   if (movieIndex === -1) return false

  //   movies.splice(movieIndex, 1)
  //   return true
  // }

  // static async update ({ id, input }) {
  //   const movieIndex = movies.findIndex(movie => movie.id === id)
  //   if (movieIndex === -1) return false

  //   movies[movieIndex] = {
  //     ...movies[movieIndex],
  //     ...input
  //   }

  //   return movies[movieIndex]
  // }
}
