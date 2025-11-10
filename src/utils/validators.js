import { body, query } from 'express-validator';

export const registerValidator = [
  body('name').isString().isLength({ min: 2 }),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
];

export const loginValidator = [
  body('email').isEmail(),
  body('password').isString().isLength({ min: 6 }),
];

export const workoutCreateValidator = [
  body('type').isString().notEmpty(),
  body('duration').isNumeric().toInt().isInt({ min: 1 }),
  body('calories').isNumeric().toInt().isInt({ min: 0 }),
];

export const nutritionCreateValidator = [
  body('food').isString().notEmpty(),
  body('calories').isNumeric().toInt().isInt({ min: 0 }),
  body('macros').optional().isObject(),
];

export const nutritionSearchValidator = [
  query('q').isString().isLength({ min: 2 })
];
