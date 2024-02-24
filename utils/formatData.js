import { Model, Service } from "../models/Model.js";
import { User } from "../models/User.js";

export const createAppointmentFormatData = async (
  firstName,
  appointmentDate,
  services,
  instruction,
  modelSelect,
  userId
) => {
  try {
    const allServices = await Service.findAll();

    const serviceIdToNameMap = allServices.reduce((map, service) => {
      map[service.id] = service.name;
      return map;
    }, {});

    const serviceNames = services.map(
      (serviceId) => serviceIdToNameMap[serviceId]
    );
    const user = await User.findByPk(userId);
    const model = await Model.findByPk(modelSelect);
    return {
      customerName: firstName,
      appointmentDate: appointmentDate.toISOString().split("T")[0],
      appointmentTime: appointmentDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      serviceType: serviceNames.join(" ,"),
      carModel: model.name,
      additionalNotes: instruction,
      customerEmail: user.email,
    };
  } catch (error) {}
};
export const updateAppointmentFormatData = async (
  firstName,
  services,
  instruction,
  modelSelect,
  userId,
  totalPrice,
) => {
  try {
    const allServices = await Service.findAll();

    const serviceIdToNameMap = allServices.reduce((map, service) => {
      map[service.id] = service.name;
      return map;
    }, {});

    const serviceNames = services.map(
      (serviceId) => serviceIdToNameMap[serviceId]
    );
    const user = await User.findByPk(userId);
    const model = await Model.findByPk(modelSelect);
    return {
      customerName: firstName,
      serviceType: serviceNames.join(" ,"),
      carModel: model.name,
      additionalNotes: instruction,
      customerEmail: user.email,
      Amount: `₹${totalPrice}`,
    };
  } catch (error) {}
};
