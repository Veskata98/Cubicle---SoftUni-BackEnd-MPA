const { Schema, model, Types } = require('mongoose');

const cubeSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true, maxlength: 500 },
    imageUrl: { type: String, required: true },
    difficultyLevel: { type: Number, required: true, min: 1, max: 6 },
    accessories: { type: [Types.ObjectId], default: [], ref: 'Accessory' },
    creatorId: { type: String, required: true, ref: 'User' },
});

cubeSchema.path('imageUrl').validate((val) => {
    urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    return urlRegex.test(val);
}, 'Invalid URL');

const Cube = model('Cube', cubeSchema);

module.exports = Cube;
