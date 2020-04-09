const express = require('express');

// Controllers
const ProjectController = require('./controllers/ProjectController');
const ActivityController = require('./controllers/ActivityController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

// Validators
const ProjectValidator = require('./validators/ProjectValidator');
const ActivityValidator = require('./validators/ActivityValidator');
const SessionValidator = require('./validators/SessionValidator');

const routes = express.Router();

routes.get('/projects', ProjectController.index);
routes.post('/projects', ProjectValidator.validCreate(), ProjectController.create);
routes.delete('/projects/:id', ProjectValidator.validDelete(), ProjectController.delete);
routes.post('/projects/edit/:id', ProjectValidator.validEdit(), ProjectController.edit);

routes.get('/activity', ActivityController.index);
routes.post('/activity', ActivityValidator.validCreate(), ActivityController.create);
routes.delete('/activity/:id', ActivityValidator.validDelete(), ActivityController.delete);
routes.post('/activity/edit/:id', ActivityValidator.validEdit(), ActivityController.edit);

routes.get('/profile', ProfileController.index);

routes.post('/sessions', SessionValidator.validCreate(), SessionController.create);

module.exports = routes;