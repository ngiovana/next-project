
exports.up = function(knex) {
  return knex.schema.createTable('activity', function (table) {
    table.increments();

    table.string('name').notNullable();
    table.date('initdate').notNullable();
    table.date('enddate').notNullable();
    table.boolean('ended').notNullable();

    table.integer('project_id').notNullable();

    table.foreign('project_id').references('id').inTable('projects');
 });
};

exports.down = function(knex) {
  return knex.schema.dropTable('activity');
};
