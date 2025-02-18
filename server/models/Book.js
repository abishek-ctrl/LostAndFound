const { default: mongoose } = require("mongoose");

const BookSchema = new mongoose.Schema({
    bookName: { type: String, required: [true, "bookName is required"]},
    Author: { type: String, required: [true,"Author is required"] },
    Year: { type: Number, required: [true,"Year of Publication is required"] },
    createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Book', BookSchema);