const express = require("express");

const router = express.Router();

const {
    registerUser,
    loginUser
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");
const validate = require("../middleware/validationMiddleware");

const {
    registerValidation,
    loginValidation
} = require("../validators/authValidator");

router.post(
    "/register",
    registerValidation,
    validate,
    registerUser
);

router.post(
    "/login",
    loginValidation,
    validate,
    loginUser
);

router.get("/profile", protect, (req, res) => {
    res.json(req.user);
});

module.exports = router;