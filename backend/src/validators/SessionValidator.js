const { celebrate, Segments, Joi } = require('celebrate');

class SessionValidator {

  validCreate() {
    return celebrate({
      [Segments.BODY]: Joi.object().keys({
        id: Joi.required(),
      })
    })
  }
  
}

module.exports = new SessionValidator();