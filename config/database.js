const mongoose = require('mongoose');

const connStr = 'mongodb://127.0.0.1:27017/test';

module.exports = async (app) => {
    try {
        await mongoose.connect(connStr, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log('Database Connected!');
    } catch (error) {
        console.error('Error initializing database!');
        process.exit(1);
    }
};
