const { body } = require("express-validator");

const taskValidation = [

    body("title")
        .notEmpty()
        .withMessage("Task title is required"),

    body("priority")
        .optional()
        .isIn(["Low", "Medium", "High"])
        .withMessage("Priority must be Low, Medium or High"),

    body("dueDate")
        .optional()
        .isISO8601()
        .withMessage("Enter a valid date")

];

module.exports = taskValidation;