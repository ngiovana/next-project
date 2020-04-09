const connection = require('../database/connections');

  module.exports = {
  async create(request, response) {
     const { id } = request.body;

     const project = await connection('projects')
     .where('id', id)
     .select('title', 'initialdate', 'finaldate')
     .first()

     if(!project) {
        return response.status(400).json({ error: 'No project found with this ID'});
     }

     return response.json(project);
  }
}