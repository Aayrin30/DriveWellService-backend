import express from "express";
import sequelize from "./config/database.js";
import AuthRoute from "./routes/AuthRoute.js";
import UserRoute from "./routes/UserRoute.js";
import CompanyRoute from "./routes/CompanyRoute.js";
import ModelRoute from "./routes/ModelRoute.js";
import ServiceRoute from "./routes/ServiceRoute.js";
import PriceRoute from "./routes/PriceRoute.js";
import AppointmentRoute from "./routes/AppointmentRoute.js";
import { User } from "./models/User.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Company, Model, Price, Service } from "./models/Model.js";
import { Appointment } from "./models/Appointment.js";
const app = express();

const initApp = async () => {
  console.log("Testing the database connection..");
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    User.sync();
    Company.sync();
    Model.sync();
    Service.sync();
    Price.sync();
    Appointment.sync();

    app.use(express.json());
    app.use(cookieParser());
    app.use(cors());
    app.use("/api/auth", AuthRoute);
    app.use("/api/user", UserRoute);
    app.use("/api/company", CompanyRoute);
    app.use("/api/model", ModelRoute);
    app.use("/api/service", ServiceRoute);
    app.use("/api/price", PriceRoute);
    app.use("/api/appointment", AppointmentRoute);

    app.listen(8800, () => {
      console.log(`Server is running at: http://localhost:8800`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

initApp();
