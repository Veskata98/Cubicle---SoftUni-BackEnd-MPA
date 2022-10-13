const Cube = require('../models/Cube');

async function getCubes(search, from, to) {
    return await Cube.find({
        name: { $regex: search || '', $options: 'i' },
        difficultyLevel: { $gte: from || 1, $lte: to || 6 },
    }).lean();
}

async function getCubeById(cubeId, isLeanedData = true) {
    if (isLeanedData) {
        return await Cube.findById(cubeId).populate('accessories').lean();
    } else {
        return await Cube.findById(cubeId).populate('accessories');
    }
}

async function createCube(userId, cubeData) {
    await Cube.create({
        name: cubeData.name,
        description: cubeData.description,
        imageUrl: cubeData.imageUrl,
        difficultyLevel: cubeData.difficultyLevel,
        creatorId: userId,
    });
}

async function deleteCube(cubeId) {
    await Cube.findByIdAndDelete(cubeId);
}

module.exports = {
    getCubes,
    getCubeById,
    createCube,
    deleteCube,
};
