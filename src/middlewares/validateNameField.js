const { errorMap } = require('../utils/errorMap');

module.exports = (req, res, next) => {
  const { name } = req.body;

  if (!name) return res.status(errorMap.INVALID_FIELD).json({ message: '"name" is required' });

  if (name.length < 5) {
    return res.status(errorMap.INVALID_LENGTH)
      .json({ message: '"name" length must be at least 5 characters long' });
  }

  return next();
};
