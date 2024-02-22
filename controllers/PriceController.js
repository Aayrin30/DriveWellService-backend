import { Price } from "../models/Model.js";

// Function to create a new price
export const createPrice = async (req, res) => {
  const { modelId, serviceId, price } = req.body;
  try {
    const newPrice = await Price.create({ modelId, serviceId, price });
    return res.status(201).json(newPrice);
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

export const getPricesByModelIdAndServices = async (req, res) => {
  const modelId = req.params.modelId;
  const selectedServices = req.body.services; // Assuming req.body.services is an array of selected service IDs from checkboxes
  try {
    // Fetch prices based on modelId and include associated services
    const prices = await Price.findAll({
      where: { modelId },
      include: [Service],
    });
    console.log("prices", prices);
    // Filter prices based on selected services
    const filteredPrices = prices.filter((price) =>
      selectedServices.includes(price.serviceId)
    );

    return res.status(200).json(filteredPrices);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
