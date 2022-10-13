const Accessory = require('../models/Accessory');

async function getAccessories() {
    return await Accessory.find({}).lean();
}

async function getAccessoryById(acceessoryId, isLeanedData = true) {
    if (isLeanedData) {
        return await Accessory.findById(acceessoryId).lean();
    } else {
        return await Accessory.findById(acceessoryId);
    }
}

async function getAvailableAccessories(availableAccessoriesIds) {
    return await Accessory.find({ _id: { $in: availableAccessoriesIds } }).lean();
}

async function createAccessory(accessoryData) {
    await Accessory.create({ ...accessoryData });
}

module.exports = {
    createAccessory,
    getAccessories,
    getAccessoryById,
    getAvailableAccessories,
};
