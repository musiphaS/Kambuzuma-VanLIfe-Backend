
// services/vanService.js
const Van = require('../models/VanModels');

const createVan = async (vanData) => {
  const van = new Van(vanData);
  await van.save();
  return van;
};

const getVan = async (vanId) => {
  const van = await Van.findById(vanId);
  return van;
};

const getVans = async (searchCriteria = {}) => {
  if (Object.keys(searchCriteria).length === 0) {
    // Implement prefetching algorithm here
    return await Van.find().limit(10); // Example: fetch first 10 vans
  }
  return await Van.find(searchCriteria);
};

const getVansForHost = async (hostId) => {
  const vans = await Van.find({ hostId });
  return vans;
};

const updateVan = async (vanId, updates) => {
  const van = await Van.findByIdAndUpdate(vanId, updates, { new: true });
  return van;
};

const deleteVan = async (vanId) => {
  await Van.findByIdAndDelete(vanId);
};

module.exports = {
  createVan,
  getVan,
  getVans,
  getVansForHost,
  updateVan,
  deleteVan,
};

