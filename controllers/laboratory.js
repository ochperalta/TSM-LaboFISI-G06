export class LaboratoryController {
  constructor ({ laboratoryModel }) {
    this.laboratoryModel = laboratoryModel
  }

  getAll = async (req, res) => {
    // const { genre } = req.query
    const result = await this.laboratoryModel.getAll()
    res.json(result)
  }
}
