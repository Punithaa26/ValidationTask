const express = require("express");
const cors = require("cors");
const { body, validationResult } = require("express-validator");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const validateForm = [
  body("companyName")
    .trim()
    .notEmpty().withMessage("Company Name is required").bail()
    .isLength({ min: 3 }).withMessage("Company Name must be at least 3 characters")
    .escape(),

  body("name")
    .trim()
    .notEmpty().withMessage("Name is required").bail()
    .isLength({ min: 3 }).withMessage("Name must be at least 3 characters")
    .escape(),

  body("email")
    .trim()
    .notEmpty().withMessage("Email is required").bail()
    .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)
    .withMessage("Only valid Gmail addresses are allowed")
    .normalizeEmail(),

  body("mobile")
    .trim()
    .notEmpty().withMessage("Mobile number is required").bail()
    .matches(/^[0-9]{10}$/)
    .withMessage("Mobile number must be exactly 10 digits"),

  body("timeline")
    .trim()
    .notEmpty().withMessage("Timeline is required")
    .escape(),

  body("projectName")
    .trim()
    .notEmpty().withMessage("Project Name is required")
    .escape(),

  body("description")
    .trim()
    .notEmpty().withMessage("Project Description is required").bail()
    .isLength({ min: 10 })
    .withMessage("Project Description must be at least 10 characters long")
    .escape(),
];


app.post("/submit", validateForm, (req, res) => {
  const errors = validationResult(req);

  
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return res.status(200).json({
    message: "✅ Form submitted successfully",
  });
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
