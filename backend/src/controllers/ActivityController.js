const connection = require('../database/connections');

module.exports = {
  async create(request, response) {
    const { name, initdate, enddate, ended } = request.body;
    const project_id = request.headers.authorization;

    const [id] = await connection('activity').insert({
      name, 
      initdate,
      enddate,
      ended,
      project_id,
    });

    return response.json({id});
  },

  async index(request, response) {

    const activities = await connection('activity').select('*');

    return response.json(activities);
 },

 async edit(request, response) {
  const { id } = request.params;
  const { name, initdate, enddate, ended } = request.body;

  const activity = await connection('activity')
  .where('id', id)
  .update({
    name, 
    initdate,
    enddate,
    ended,
  });

  return response.json(activity);
 },

 async delete(request, response) {
  const { id } = request.params; 
  
  await connection('activity').where('id', id).delete();
  return response.status(204).send();
  
}

}