
exports.up = function(knex) {
  return knex.schema.createTable('projects', function (table) {
    table.integer('id').primary();
    table.string('title').notNullable();
    table.date('initialdate').notNullable();
    table.date('finaldate').notNullable();
 });
};

exports.down = function(knex) {
  return knex.schema.dropTable('projects');
};
