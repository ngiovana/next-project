const { celebrate, Segments, Joi } = require('celebrate');

class ProjectValidator {

  validCreate() {
    return celebrate({
      [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        initialdate: Joi.string().required(),
        finaldate: Joi.string().required(),
      })
    })
  }

  validDelete() {
    return celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
      })
    })
  }

  validEdit() {
    return celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
      }),
      [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        initialdate: Joi.string().required(),
        finaldate: Joi.string().required(),
      })
    })
  }

}

module.exports = new ProjectValidator();