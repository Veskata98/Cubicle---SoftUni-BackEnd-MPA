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

module.exports = {
    getAccessories,
    getAccessoryById,
    getAvailableAccessories,
};
