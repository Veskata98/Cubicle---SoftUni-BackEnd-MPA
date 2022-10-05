const { Schema, model, Types } = require('mongoose');

const cubicSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true, maxlength: 300 },
    imageUrl: { type: String, required: true },
    difficultyLevel: { type: Number, required: true, min: 1, max: 6 },
    accessories: { type: [Types.ObjectId], default: [], ref: 'Accessory' },
});

cubicSchema.path('imageUrl').validate((val) => {
    urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    return urlRegex.test(val);
}, 'Invalid URL.');

const Cubic = model('Cubic', cubicSchema);

module.exports = Cubic;
