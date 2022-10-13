const { Schema, model, Types } = require('mongoose');

const accessorySchema = new Schema({
    name: { type: String, required: true, minlength: [5, 'Name should be atleast 5 characters long'] },
    description: { type: String, required: true, minlength: [20, 'Description should be atleast 20 characters long'] },
    imageUrl: { type: String, required: true },
    cubes: { type: [Types.ObjectId], default: [], ref: 'Cube' },
});

accessorySchema.path('imageUrl').validate((val) => {
    urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    return urlRegex.test(val);
}, 'Invalid URL.');

const Accessory = model('Accessory', accessorySchema);

module.exports = Accessory;
