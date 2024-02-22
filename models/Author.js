import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Author = sequelize.define("Author", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bookIds: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const value = this.getDataValue('bookIds');
      return value ? JSON.parse(value) : [];
    },
    set(value) {
      this.setDataValue('bookIds', JSON.stringify(value));
    },
  },
});

export { Author };
