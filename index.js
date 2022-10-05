const env = process.env.NODE_ENV || 'development';

const config = require('./config/config')[env];
const app = require('express')();

require('./config/express')(app);
require('./config/routes')(app);

///////////////////////////////////////////////////////////////////
//Mongoose DB

const mongoose = require('mongoose');

main().catch((err) => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');

    const kittySchema = new mongoose.Schema({
        name: String,
    });

    kittySchema.methods.speak = function speak() {
        const greeting = this.name ? 'Meow name is ' + this.name : "I don't have a name";
        console.log(greeting);
    };

    const Kitten = mongoose.model('Kitten', kittySchema);

    const fluffy = new Kitten({ name: 'fluffy' });
    fluffy.speak(); // "Meow name is fluffy"

    await Kitten.deleteMany({});
}

///////////////////////////////////////////////////////////////////

app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));
