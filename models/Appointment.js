import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/database.js";

const Appointment = sequelize.define("Appointment", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  vehicleNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  companySelect: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  modelSelect: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  services: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const value = this.getDataValue("services");
      return value ? JSON.parse(value) : [];
    },
    set(value) {
      this.setDataValue("services", JSON.stringify(value));
    },
  },
  appointmentDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  instruction: {
    type: DataTypes.TEXT,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pinCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.DECIMAL(9, 2),
    defaultValue: 0,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export { Appointment };
