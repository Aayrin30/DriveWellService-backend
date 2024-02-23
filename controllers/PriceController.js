import { Price } from "../models/Model.js";

// Function to create a new price
export const createPrice = async (req, res) => {
  const { modelId, serviceId, price } = req.body;
  try {
    const newPrice = await Price.create({ modelId, serviceId, price });
    return res
      .status(201)
      .json({ newPrice, message: "Price has been Created" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Function to get all prices
export const getAllPrices = async (req, res) => {
  try {
    const prices = await Price.findAll();
    return res.status(200).json(prices);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPricesByModelIdAndServices = async ({
  modelId,
  selectedServices,
}) => {
  try {
    // Fetch prices based on modelId and include associated services
    const prices = await Price.findAll({
      where: { modelId },
    });
    // Filter prices based on selected services
    const filteredPrices = prices.filter((price) =>
      selectedServices.includes(price.serviceId)
    );
    const totalPrice = filteredPrices.reduce(
      (total, price) => total + parseFloat(price.price),
      0
    );
    return totalPrice;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deletePrice = async (req, res) => {
  try {
    const { id } = req.params;
    const price = await Price.findByPk(id);

    if (!price) return res.status(404).json({ error: "Price Does not Exist" });
    const deletedRowCount = await Price.destroy({ where: { id } });
    if (deletedRowCount === 1) {
      return res.status(200).json({ message: "Price has been deleted." });
    } else {
      return res.status(500).json({ error: "Failed to delete Company" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};
