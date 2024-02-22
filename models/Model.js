import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/database.js";
// Define Company Model
const Company = sequelize.define("Company", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
});

const Model = sequelize.define("Model", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  companyId: {
    type: DataTypes.UUID,
    references: {
      model: "companies", // Name of the referenced model
      key: "id", // Name of the referenced column
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
});

const Service = sequelize.define("Service", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Price = sequelize.define("Price", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  price: {
    type: DataTypes.DECIMAL(7, 2),
    allowNull: false,
    defaultValue: 0,
  },
  modelId: {
    type: DataTypes.UUID,
    references: {
      model: "models", // Name of the referenced model
      key: "id", // Name of the referenced column
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  serviceId: {
    type: DataTypes.UUID,
    references: {
      model: "services", // Name of the referenced model
      key: "id", // Name of the referenced column
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
});

Company.hasMany(Model, { foreignKey: "companyId" });
Model.belongsTo(Company, { foreignKey: "companyId" });

Model.hasMany(Price, { foreignKey: "modelId" });
Price.belongsTo(Model, { foreignKey: "modelId" });

Price.belongsTo(Service, { foreignKey: "serviceId" });
Service.hasMany(Price, { foreignKey: "serviceId" });

export { Company, Model, Service, Price };
