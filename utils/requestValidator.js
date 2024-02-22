import { body } from "express-validator";

export const registerValidationRules = () => {
  return [
    body("username").notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
    body("email").isEmail().withMessage("Email is not valid"),
  ];
};

export const loginValidationRules = () => {
  return [
    body("username").notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ];
};

export const appointmentValidationRules = () => {
  return [
    body("vehicleNumber").notEmpty().withMessage("Vehicle Number is required"),
    body("companySelect").notEmpty().withMessage("Need to Select Company"),
    body("modelSelect").notEmpty().withMessage("Need to Select Model"),
    body("services")
      .notEmpty()
      .withMessage("Need to Select Desired Services")
      .isArray({ min: 1 })
      .withMessage("At least one service must be selected"),
    body("appointmentDate").notEmpty().withMessage("Select Pickup Date"),
    body("firstName").notEmpty().withMessage("Add First Name"),
    body("lastName").notEmpty().withMessage("Add Last Name"),
    body("phoneNumber").notEmpty().withMessage("Add Phone Number"),
    body("address").notEmpty().withMessage("Add Address"),
    body("city").notEmpty().withMessage("Add City"),
    body("pinCode").notEmpty().withMessage("Add PinCode"),
  ];
};
