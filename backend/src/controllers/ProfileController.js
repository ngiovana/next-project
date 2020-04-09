const connection = require('../database/connections');

  module.exports = {
   async index(request, response) {
      const project_id = request.headers.authorization;
      
      const activity = await connection('activity')
      .where('project_id', project_id)
      .select('*');

      return response.json(activity);
   }
  }