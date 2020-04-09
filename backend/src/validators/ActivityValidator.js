const { celebrate, Segments, Joi } = require('celebrate');

class ActivityValidator {

  validCreate() {
    return celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        initdate: Joi.string().required(),
        enddate: Joi.string().required(),
        ended: Joi.any(),
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
        name: Joi.string().required(),
        initdate: Joi.string().required(),
        enddate: Joi.string().required(),
        ended: Joi.any(),
      })
    })
  }

}

module.exports = new ActivityValidator();