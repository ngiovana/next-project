const connection = require('../database/connections');

module.exports = {
  async index(request,response) {
    const projects = await connection('projects').select('*');

    return response.json(projects);
  },

  async create(request, response) {
    const {title, initialdate, finaldate } = request.body;

    const [id] = await connection('projects').insert({
      title,
      initialdate,
      finaldate,
    });

    return response.json({id}); 
  },

  async edit(request, response) {
    const { id } = request.params;
    const { title, initialdate, finaldate } = request.body;
  
    const project = await connection('projects')
    .where('id', id)
    .update({
      title,
      initialdate,
      finaldate,
    });
  
    return response.json(project);
   },

  async delete(request, response) {
    const { id } = request.params; 
    
    await connection('projects').where('id', id).delete();

    await connection('activity').where('project_id', id).delete();
    
    return response.status(204).send();
    
  }

}