const Joi = require('joi');

const createBorrowerSchema = Joi.object({
  fullName: Joi.string().min(3).max(100).required().messages({
    'string.empty': 'Full name is required',
    'string.min': 'Full name must be at least 3 characters',
  }),
  mobile: Joi.string().length(10).pattern(/^\d+$/).required().messages({
    'string.length': 'Mobile must be 10 digits',
    'string.pattern.base': 'Mobile must contain only numbers',
  }),
  alternateMobile: Joi.string().length(10).pattern(/^\d+$/).optional().allow('').messages({
    'string.length': 'Alternate mobile must be 10 digits',
    'string.pattern.base': 'Alternate mobile must contain only numbers',
  }),
  email: Joi.string().email().optional().allow('').messages({
    'string.email': 'Please provide a valid email',
  }),
  address1: Joi.string().max(255).optional().allow(''),
  address2: Joi.string().max(255).optional().allow(''),
  city: Joi.string().max(50).optional().allow(''),
  state: Joi.string().max(50).optional().allow(''),
  pinCode: Joi.string().length(6).pattern(/^\d+$/).optional().allow('').messages({
    'string.length': 'Pin code must be 6 digits',
    'string.pattern.base': 'Pin code must contain only numbers',
  }),
  guarantorName: Joi.string().max(100).optional().allow(''),
  guarantorPhone: Joi.string().length(10).pattern(/^\d+$/).optional().allow('').messages({
    'string.length': 'Guarantor phone must be 10 digits',
    'string.pattern.base': 'Guarantor phone must contain only numbers',
  }),
  guarantorAddress: Joi.string().max(255).optional().allow(''),
  relativesPhone: Joi.string().length(10).pattern(/^\d+$/).optional().allow('').messages({
    'string.length': 'Relative phone must be 10 digits',
    'string.pattern.base': 'Relative phone must contain only numbers',
  }),
  relation: Joi.string().max(50).optional().allow(''),
});

const updateBorrowerSchema = Joi.object({
  fullName: Joi.string().min(3).max(100).optional(),
  mobile: Joi.string().length(10).pattern(/^\d+$/).optional(),
  alternateMobile: Joi.string().length(10).pattern(/^\d+$/).optional().allow(''),
  email: Joi.string().email().optional().allow(''),
  address1: Joi.string().max(255).optional().allow(''),
  address2: Joi.string().max(255).optional().allow(''),
  city: Joi.string().max(50).optional().allow(''),
  state: Joi.string().max(50).optional().allow(''),
  pinCode: Joi.string().length(6).pattern(/^\d+$/).optional().allow(''),
})
  .min(1)
  .messages({
    'object.min': 'At least one field must be provided for update',
  });

const validateCreateBorrower = (req, res, next) => {
  const { error, value } = createBorrowerSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.details.map((e) => ({ field: e.path[0], message: e.message })),
    });
  }
  req.body = value;
  next();
};

const validateUpdateBorrower = (req, res, next) => {
  const { error, value } = updateBorrowerSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.details.map((e) => ({ field: e.path[0], message: e.message })),
    });
  }
  req.body = value;
  next();
};

module.exports = {
  validateCreateBorrower,
  validateUpdateBorrower,
};
