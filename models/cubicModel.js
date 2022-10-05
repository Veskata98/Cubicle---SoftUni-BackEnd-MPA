const uniqid = require('uniqid');

class Cube {
    constructor(data) {
        this._id = uniqid();
        this.name = data.name;
        this.description = data.description;
        this.imageUrl = data.imageUrl;
        this.difficultyLevel = data.difficultyLevel;
    }
}

function createCubic(cubicData) {
    const cubic = new Cube(cubicData);
    return cubic;
}

module.exports = createCubic;
