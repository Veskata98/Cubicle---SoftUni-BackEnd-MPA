const Accessory = require('../models/Accessory');

async function getAccessories() {
    return Accessory.find({}).lean();
}

async function getAccessoryById(acceessoryId, isLeanedData = true) {
    if (isLeanedData) {
        return Accessory.findById(acceessoryId).lean();
    } else {
        return Accessory.findById(acceessoryId);
    }
}

async function getAvailableAccessories(availableAccessoriesIds) {
    return Accessory.find({ _id: { $in: availableAccessoriesIds } }).lean();
}

async function createAccessory(accessoryData) {
    Accessory.create({ ...accessoryData });
}

module.exports = {
    createAccessory,
    getAccessories,
    getAccessoryById,
    getAvailableAccessories,
};
