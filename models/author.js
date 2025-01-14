const mongoose = require('mongoose');
const Book = require('./book')
const authorSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true
    }
})

authorSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    const books = await Book.find({ author: this._id });
    if (books.length > 0) {
        return next(new Error('This Author has books still.'));
    }
    next();
});

module.exports = mongoose.model('Author',authorSchema)